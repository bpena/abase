import express from 'express'
import Debug from 'debug'
import { handleError } from '../utils';
import { User } from '../models'
import { generateHash } from '../utils'
import { UserStatus, VALIDATION_TIME } from '../commons'
import { sendResetPasswordEmail, ofuscateUser } from '../utils'
import { hashed, validHash, registeredEmail } from '../middlewares'
import {
    hashSync as hash
} from 'bcryptjs'

const app = express.Router()
const debug = new Debug('server::user-route')

// GET /api/v1/user
app.get('/', async (req, res, next) => {
    const users = await User.find()
    res.status(200).json(users)
})

// GET /api/v1/user/:id
app.get('/:id', async (req, res, next) => {
    try {
        const user = ofuscateUser(await User.findOne({ '_id': req.params.id }))
        if (!user) {
            return handleError(404, 'User not found', `No user founded with _id ${req.params.id}`)
        }
        res.status(200).json(user)
    } catch (error) {
        return handleError(error.code, error.name, error.errMsg, res)
    }
})

// GET /api/v1/user/activate/:hash
app.get('/activate/:hash', hashed, validHash, async (req, res, next) => {
    const _user = req.user
    _user.hashActivator = null
    _user.hashDate = null
    _user.status = UserStatus.ACTIVATED
    const saved = ofuscateUser(await _user.save())
    res.status(200).json(saved)
})

// GET /api/v1/user/reset/:hash
// validate reset hash and return user if hash is valid 
app.get('/reset/:hash', hashed, validHash, async (req, res, next) => {
    const _user = ofuscateUser(await User.findOne({'hashActivator': req.params.hash}))
    res.status(200).json(_user)
})

// POST /api/v1/user/reset
// send email with reset password link and update status, hashDate and hashActivator
app.post('/reset', registeredEmail, async (req, res, next) => {
    const _user = req.user
    if (_user.status !== UserStatus.UNCONFIRMED) {
        _user.status = UserStatus.RESETED
        _user.hashDate = new Date().getTime()
        _user.hashActivator = generateHash()

        const user = ofuscateUser(await _user.save())

        sendResetPasswordEmail(user)

        res.status(200).json({
            message: 'Email sent'
        })
    }
    else {
        return handleError(404, 'Unconfirmed User', 'This email belongs to a user who has not been confirmed', res)
    }
})

// PUT /api/v1/user/:id/password
// Update password
app.put('/:id/password', async (req, res, next) => {
    const password = hash(req.body.password, 10)

    try {
        const user = await User.findOne({ '_id': req.params.id })
        user.password = password
        user.status = UserStatus.ACTIVATED
        user.hashDate = null
        user.hashActivator = null
        const saved = ofuscateUser(await user.save())
        res.status(200).json(user)
    } catch (error) {
        handleError(error.code, error.name, error.errMsg, res)
    }
})

export default app