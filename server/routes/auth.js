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

const app = express.Router()
const debug = new Debug('server::auth-route')

export const loggedUsers = {}

export const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 3600 })

app.get('/user', async (req, res, next) => {
    const users = await User.find()
    res.status(200).json(users)
})

// POST /api/v1/auth/signin
app.post('/signin', async (req, res, next) => {
    const { username, password } = req.body

    debug(password)

    const user = await User.findOne({ username })

    if (!user) {
        debug(`User with username ${username} not found`)
        return handleError(res)
    }

    if (!comparePasswords(password, user.password)) {
        debug(`Password do not match ${password} !== ${user.password}`)
        return handleError(res)
    }

    const token = createToken(user)
    // add current user to logged user list
    loggedUsers[token] = user

    res.status(200).json({
        message: 'Login succeded',
        token: token,
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        uusername: user.username,
        displayname: user.displayname
    })
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
    })
    debug(`Creating new user ${newUser}`)
    
    const user = await newUser.save()
    const token = createToken(user)

    // add current user to logged user list
    loggedUsers[token] = user

    res.status(201).json({
        message: 'User saved',
        token,
        userId: user._id,
        firstname,
        lastname,
        email,
        username,
        displayname: (user.firstname + ' ' + user.lastname)
    })
})

const handleError = res => {
    return res.status(401).json({
        message: 'Login failed',
        error: 'Email and password don\'t match'
    })
}

export default app