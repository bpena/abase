import express from 'express'
import Debug from 'debug'
import { handleError } from '../utils';
import { User } from '../models'
import { generateHash } from '../utils'
import { UserStatus } from '../commons'

const app = express.Router()
const debug = new Debug('server::user-route')

// GET /api/v1/user
app.get('/', async (req, res, next) => {
    const users = await User.find()
    res.status(200).json(users)
})

app.get('/update', async (req, res, next) => {
    const users = await User.find()
    users.forEach(_user => {
        const hash = generateHash();
        _user.hashDate = new Date().getTime()
        _user.hashActivator = hash
        _user.status = UserStatus.RESTARTED
        const saved = _user.save()

        debug(saved)
    });

    res.send('listo')
})

// GET /api/v1/user/:id
app.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ 'id': req.params.id });
        res.status(200).json(user);
    } catch (error) {
        handleError(error, res);
    }
})

// GET /api/v1/user/activate/:hash
app.get('/activate/:hash', async (req, res, next) => {
    const _user = await User.findOne({'hashActivator': req.params.hash})
    if (_user) {
        const _timeDiff = _user.status === UserStatus.UNCONFIRMED ? 0 : 
                    ((new Date().getTime() - _user.hashDate.getTime()) / 60000)
        if (_timeDiff <= 10) {
            _user.hashActivator = null
            _user.hashDate = null
            _user.status = UserStatus.ACTIVATED
            const saved = await _user.save()
            res.send('Activado')
        }
        else {
            handleError('Link is expired', res)
        }
    }
    else {
        handleError('Hash don\'t found', res)
    }
})
export default app