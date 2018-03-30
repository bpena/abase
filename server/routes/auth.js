import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { required } from '../middlewares'

const app = express.Router()
const debug = new Debug('server::auth-route')

const secret = 'miclavesecreta'

const users = [
    {
        _id: 1,
        username: 'bpena',
        firstname: 'Bernardo',
        lastname: 'Peña',
        email: 'bernardo.pena.ramos@gmail.com',
        password: '123456',
        createdAt: Date.now()
    },
    {
        _id: 2,
        username: 'bernardo.penar@hotmail.com',
        firstname: 'Bernardo',
        lastname: 'Peña',
        email: 'bernardo.pena.ramos@gmail.com',
        password: 'elcondenado',
        createdAt: Date.now()
    },
]

const loggedUsers = {}

const findUserByUsername = uname => users.find(({ username }) => username === uname)

const comparePasswords = (providedPassword, userPassword) => providedPassword === userPassword

const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 3600 })

app.get('/user', (req, res, next) => {
    debug(1)
    res.status(200).json(users)
})

// POST /api/v1/auth/signin
app.post('/signin', (req, res, next) => {
    const { username, password } = req.body

    debug(password)

    const user = findUserByUsername(username)

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
        uusername: user.username
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
app.post('/signup', (req, res, next) => {
    const { username, password, firstname, lastname, email } = req.body

    const user = {
        _id: +new Date(),
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password
    }
    debug(`Creating new user ${user}`)
    
    const token = createToken(user)
    // added current user to user list
    users.push(user)
    // add current user to logged user list
    loggedUsers[token] = user

    res.status(201).json({
        message: 'User saved',
        token,
        userId: user._id,
        firstname,
        lastname,
        email,
        username
    })
})

const handleError = res => {
    return res.status(401).json({
        message: 'Login failed',
        error: 'Email and password don\'t match'
    })
}

export default app