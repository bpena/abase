import express from 'express'
import Debug from 'debug'
import { handleError } from '../utils';
import { User } from '../models'
import { generateHash } from '../utils'
import { UserStatus, VALIDATION_TIME } from '../commons'
import { sendResetPasswordEmail } from '../utils'
import { hashed, validHash } from '../middlewares'
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
        const user = await User.findOne({ 'id': req.params.id })
        res.status(200).json(user)
    } catch (error) {
        handleError(error, res)
    }
})

// GET /api/v1/user/activate/:hash
app.get('/activate/:hash', hashed, validHash, async (req, res, next) => {
    const _user = req.user
    _user.hashActivator = null
    _user.hashDate = null
    _user.status = UserStatus.ACTIVATED
    const saved = await _user.save()
    const { _id, username, firstname, lastname, email, status } = saved
    res.status(200).json({
        _id,
        username,
        firstname,
        lastname,
        email,
        status
    })
})

// GET /api/v1/user/reset/:hash
// validate reset hash and return user if hash is valid 
app.get('/reset/:hash', hashed, validHash, async (req, res, next) => {
    const _user = await User.findOne({'hashActivator': req.params.hash})
    const { _id, username, firstname, lastname, email, status } = _user
    res.status(200).json({
        _id,
        username,
        firstname,
        lastname,
        email,
        status
    })
})

// POST /api/v1/user/reset
// send email with reset password link and update status, hashDate and hashActivator
app.post('/reset', async (req, res, next) => {
    const { email } = req.body
    const _user = await User.findOne({'email': email})
    if (_user && _user.status !== UserStatus.UNCONFIRMED) {
        _user.status = UserStatus.RESETED
        _user.hashDate = new Date().getTime()
        _user.hashActivator = generateHash()

        const user = await _user.save()

        sendResetPasswordEmail(user)

        res.status(200).json({
            message: 'Email sent'
        })
    }
    else {
        handleError(`No user associated to ${email}`, res)
    }
})

// PUT /api/v1/user/:id/password
// Update password
app.put('/:id/password', async (req, res, next) => {
    const password = hash(req.body.password, 10)

    try {
        const user = await User.findOne({ '_id': req.params.id })
        user.password = password
        const saved = await user.save()
        res.status(200).json(user)
    } catch (error) {
        handleError(error, res)
    }
})

export default app