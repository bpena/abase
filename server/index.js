import http from 'http'
import Debug from 'debug'
import app from './app'
import mongoose from 'mongoose'
import { appName, mongoUrl } from './config'

const PORT = 3000
const debug = new Debug(`${appName}::root`)

async function start() {
    await mongoose.connect(mongoUrl)
    app.listen(PORT, () => {
        debug(`Server running at port ${PORT}`)
    })
}

start()
