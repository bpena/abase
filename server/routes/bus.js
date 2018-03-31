import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import { required } from '../middlewares'
import { User } from '../models'
import { bus } from '../db-api';
import { handleError } from '../utils';

const app = express.Router()
const debug = new Debug('server::bus-route')

const currentUser = {};

// GET /api/bus
app.get('/', async (req, res) => {
    try {
        const { sort } = req.query;
        const buses = await bus.findAll(sort);
        res.status(200).json(buses);
    } catch(error) {
        handleError(error, res);
    }
});


export default app