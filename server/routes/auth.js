import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { handleError } from '../utils';
import { secret } from '../config'
import { required, requestUser, noRegisteredUsername, noRegisteredEmail } from '../middlewares'
import { User } from '../models'
import {
    hashSync as hash,
    compareSync as comparePasswords
} from 'bcryptjs'
import { generateHash, sendActivationEmail, ofuscateUser } from '../utils'
import { UserStatus, Error } from '../commons'

const app = express.Router()
const debug = new Debug('server::auth-route')

export const loggedUsers = {}

export const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 3600 })

// GET /api/v1/auth/token/:token
app.get('/token', required, (req, res, next) => {
    res.status(200).json({
        message: 'token is valid',
        isValid: true
    })    
})

// POST /api/v1/auth/signin
app.post('/signin', async (req, res, next) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    if (!user) {
        debug(`User with username ${username} not found`)
        return handleError(401, 'Login failed', 'Email and password don\'t match', res)
    }

    if (!comparePasswords(password, user.password)) {
        debug(`Password do not match ${password} !== ${user.password}`)
        return handleError(401, 'Login failed', 'Email and password don\'t match', res)
    }

    if (user.status === UserStatus.UNCONFIRMED) {
        debug(`User ${user} is unconfirmed`)
        return handleError(401, 'Login failed', `User is unconfirmed`, res)
    }

    const token = createToken(user)
    // add current user to logged user list
    loggedUsers[token] = user

    const response = {
        user: ofuscateUser(user),
        message: 'Login succeded',
        token: token
    }

    res.status(200).json(response)
})

// POST /api/v1/auth/signout
app.post('/signout', required, (req, res, next) => {
    const token = req.headers.token

    // remove token of loggedUser list
    delete loggedUsers[token]

    res.status(200).json({
        message: 'Logout succeded'
    })
})

// POST /api/v1/auth/signup
app.post('/signup', requestUser, noRegisteredUsername, noRegisteredEmail, async (req, res, next) => {
    const newUser = req.user
    
    debug(`Creating new user ${newUser}`)
    
    try {
        const user = await newUser.save()
    
        const token = createToken(user)
    
        // add current user to logged user list
        loggedUsers[token] = user
    
        sendActivationEmail(user)
    
        const response = {
            user: ofuscateUser(user),
            message: 'User saved',
            token: token
        }
        
        res.status(201).json(response)
    }
    catch(error) {
        debug(`error: ${error}`)
        return handleError(500, error.name, error.errmsg, res)
    }
})

export default app