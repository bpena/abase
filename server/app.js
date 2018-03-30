import express from 'express'
import bodyParser from 'body-parser'
import { auth, user } from './routes'

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Token')
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE OPTIONS')
        next()
    })
}

app.use('/api/v1/auth', auth)
app.use('/api/v1/user', user)

export default app