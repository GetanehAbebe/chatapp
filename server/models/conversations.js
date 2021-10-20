const { ObjectId } = require('bson')
const mongoose = require('mongoose')

const conversationSchema = new mongoose.Schema({
    name: { type: String },
    participants: [{ type: Object, default: [] }],
    date: { type: Date, default: Date.now() },
    messages: [{ type: Object,ref:'Message' }],
    admin: { type: ObjectId, ref: 'User' },
  
})


module.exports = mongoose.model('Conversation', conversationSchema)