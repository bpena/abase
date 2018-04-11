import Debug from 'debug'
import { handleError } from '../utils';
import { UserStatus, VALIDATION_TIME } from '../commons'
import { User } from '../models'

const debug = new Debug('server::user-middleware')

export const hashed =  async (req, res, next) => {
    const _user = await User.findOne({'hashActivator': req.params.hash})
    if (_user) {
        req.user = _user
        next()
    }
    else {
        return handleError('Hash don\'t found', res)
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
        return handleError('Link is expired', res)
    }
}
