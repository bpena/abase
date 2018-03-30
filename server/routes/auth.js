import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'

const app = express.Router()
const debug = new Debug('server::auth-route')

const secret = 'miclavesecreta'

const users = [{
    _id: 1,
    username: 'bpena',
    firstname: 'Bernardo',
    lastname: 'Peña',
    email: 'bernardo.pena.ramos@gmail.com',
    password: '123456',
    createdAt: Date.now()
}]

const findUserByUsername = uname => users.find(({ username }) => username === uname)

const comparePasswords = (providedPassword, userPassword) => providedPassword === userPassword

app.get('/user', (req, res, next) => {
    debug(1)
    res.status(200).json(users)
})

// POST /api/v1/auth
app.post('/signin', (req, res, next) => {
    const { username, password } = req.body
    const user = findUserByUsername(username)

    if (!user) {
        debug(`User with username ${username} not found`)
        return handleError(res)
    }

    if (!comparePasswords(password, user.password)) {
        debug(`Password do not match ${password} !== ${user.password}`)
        return handleError(res)
    }

    const token = jwt.sign({ user }, secret, { expiresIn: 3600 })

    res.status(200).json({
        message: 'Login succeded',
        token: token,
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    })
})

const handleError = res => {
    return res.status(401).json({
        message: 'Login failed',
        error: 'Email and password don\'t match'
    })
}

export default app