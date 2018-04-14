import Debug from 'debug'
import { handleError } from '../utils';
import { UserStatus, VALIDATION_TIME } from '../commons'
import { User } from '../models'
import { generateHash, ofuscateUser } from '../utils'
import { hashSync as hash } from 'bcryptjs'

const debug = new Debug('server::user-middleware')

export const requestUser = async (req, res, next) => {
    const { username, password, firstname, lastname, email } = req.body
    const user = new User({
        firstname,
        lastname,
        email,
        username,
        password: hash(password, 10),
        hashDate: new Date().getTime(),
        hashActivator:  generateHash(),
        status: UserStatus.UNCONFIRMED
    })
    req.user = user
    next() 
}

export const noRegisteredUsername = async (req, res, next) => {
    const _user = req.user

    try {
        const user = ofuscateUser(await User.findOne({ 'username': _user.username }))
        debug(`usuario: ${user}`)
        if (user) {
            debug('verificando si usuario existe')
            return handleError(409, 'Users exist', 'This username is already registered.', res)
        }

        next()
    } catch (error) {
        debug(`error: ${error}`)
        return handleError(500, error.name, error.errMsg, res)
    }
}

export const noRegisteredEmail = async (req, res, next) => {
    const _user = req.user
    debug('verificando si email esta registrado')

    try {
        const user = ofuscateUser(await User.findOne({ 'email': _user.email }))

        if (user) {
            return handleError(409, 'Email registered', 'This email is already registered.', res)
        }

        next()
    } catch (error) {
        return handleError(500, error.name, error.errMsg, res)
    }
}

export const registeredEmail = async (req, res, next) => {
    const { email } = req.body
    const _user = await User.findOne({'email': email})

    if (!_user) {
        return handleError(404, 'User not found', `No user associated to ${email}`, res)
    }
    else {
        req.user = _user
    }
    next()
}

export const hashed =  async (req, res, next) => {
    const _user = await User.findOne({'hashActivator': req.params.hash})
    if (_user) {
        req.user = _user
        next()
    }
    else {
        return handleError(404, 'Hash don\'t found', `No hash activation founded with value ${req.params.hash}`, res)
    }
}

export const validHash = (req, res, next) => {
    const _user = req.user
    // _timeDiff in minutes
    const _timeDiff = _user.status === UserStatus.UNCONFIRMED ? 0 : 
                ((new Date().getTime() - _user.hashDate.getTime()) / 60000)
    if (_timeDiff <= VALIDATION_TIME) {
        next()
    }
    else {
        return handleError(410, 'Server Error', 'Link is expired', res)
    }
}

