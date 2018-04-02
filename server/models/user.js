import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const UserSchema = Schema({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    createdAt: { type: Date, default: Date.now, required: true },
    status: { type: String, default: 'unconfirmed', required: true },
    hashActivator: { type: String, required: false },
    hashDate: { type: Date, default: Date.now, required: false}
})

export default mongoose.model('User', UserSchema)