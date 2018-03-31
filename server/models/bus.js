import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { ObjectId } = Schema.Types;

const BusSchema = Schema({
    number: { type: String, required: true, unique: true, index: true },
    numberPlate: { type: String, required: true },
    alias: { type: String, required: true },
    owner: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, required: true },
    createdBy: { type: ObjectId, ref: 'User' }
})

export default mongoose.model('User', UserSchema)