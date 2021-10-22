const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    registrationDate: { type: Date, default: Date.now() },
    contacts: [{ type: Object, ref: "User" }],
    token: { type: String }
})
// userSchema.plugin(uniqueValidator)
module.exports = mongoose.models.User || mongoose.model('User', userSchema)