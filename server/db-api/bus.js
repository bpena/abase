import Debug from 'debug'
import { Bus } from '../models'

const debug = new Debug('server:db-api:question')

export default {
    findAll: (sort = '-createdAt') => {
        debug('Finding all buses')
        return Bus.find().sort(sort)
    },

    findById: (_id) => {
        debug(`Finding buses with id ${_id}`)
        return Bus
            .findById({ _id })
    },

    create: (newBus) => {
        debug(`Creating new bus ${newBus}`)
        const bus = new Bus(newBus)
        return bus.save()
    }
}