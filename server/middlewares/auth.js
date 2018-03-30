import Debug from 'debug'
import { secret } from '../config'
import jwt from 'jsonwebtoken'

const debug = new Debug('server::auth-middleware')

export const users = [
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

export const loggedUsers = {}

export const findUserByUsername = uname => users.find(({ username }) => username === uname)

export const comparePasswords = (providedPassword, userPassword) => providedPassword === userPassword

export const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 3600 })

export const required = (req, res, next) => {
    jwt.verify(req.headers.token, secret, (err, token) => {
        if (err) {
            debug('JWT was not encrypted with our secret')
            return res.status(401).json({
                message: 'Unauthorized',
                error: err
            })
        }

        debug(`Token verified ${token}`)

        req.user = token.user
        next()
    })
}