import Debug from 'debug'

const debug = new Debug('server::utils-user')

export const ofuscateUser = (user) => {
    user.password = undefined
    return user
}