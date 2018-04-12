import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { required } from '../middlewares'
import { User } from '../models'
import {
    hashSync as hash,
    compareSync as comparePasswords
} from 'bcryptjs'
import { generateHash, sendActivationEmail, ofuscateUser } from '../utils'
import { UserStatus } from '../commons'

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
        return handleError('Email and password don\'t match', res)
    }

    if (!comparePasswords(password, user.password)) {
        debug(`Password do not match ${password} !== ${user.password}`)
        return handleError('Email and password don\'t match', res)
    }

    if (user.status === UserStatus.UNCONFIRMED) {
        debug(`User ${user} is unconfirmed`)
        return handleError(`User is unconfirmed`, res)
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
app.post('/signup', async (req, res, next) => {
    const { username, password, firstname, lastname, email } = req.body
    const newUser = new User({
        firstname,
        lastname,
        email,
        username,
        password: hash(password, 10),
        hashDate: new Date().getTime(),
        hashActivator:  generateHash(),
        status: UserStatus.UNCONFIRMED
        })

    debug(`Creating new user ${newUser}`)
    
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
})

const handleError = (error, res) => {
    return res.status(401).json({
        message: 'Login failed',
        error: error
    })
}

export default app