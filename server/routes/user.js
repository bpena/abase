import express from 'express'
import Debug from 'debug'

const app = express.Router()
const debug = new Debug('server::user-route')

const user = {
    _id: 1,
    username: 'bpena',
    firstname: 'Bernardo',
    lastname: 'Peña',
    email: 'bernardo.pena.ramos@gmail.com',
    password: '123456',
    createdAt: Date.now()
}

const users = new Array(10).fill(user)

// GET /api/v1/user
app.get('/', (req, res) => {
    debug(1)
    res.status(200).json(users);
})

// GET /api/v1/user/:id
app.get('/:id', (req, res) => res.status(200).json(user))

export default app