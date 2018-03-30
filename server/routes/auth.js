import express from 'express'
import Debug from 'debug'

const app = express.Router()
const debug = new Debug('server::auth-route')

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
    debug('1')
    debug(req.body)
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

    debug('casi saliendo')
    res.status(200).json('')
})

const handleError = res => {
    res.status(401).json({
        message: 'Login failed',
        error: 'Email and password don\'t match'
    })
}

export default app