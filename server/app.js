import express from 'express'
import { user } from './routes'

const app = express()

app.use('/api/v1/user', user)

export default app