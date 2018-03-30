import express from 'express'
import { user } from './routes'

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Token')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE OPTIONS')
        next()
    })
}

app.use('/api/v1/user', user)

export default app