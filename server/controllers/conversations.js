const Conversation = require('../models/conversations')

const createNewConversation = async (req, res, next) => {
    const { users, name, userId } = req.body
    console.log('users', users)
    const newUsers = users.map(user => {
        return { ...user, joinDay: Date.now() }
    })
    console.log(newUsers)
    try {
        const addConversation = await new Conversation({
            admin: userId,
            name,
            participants: newUsers,

        })
        addConversation.messages = []
        const created = await addConversation.save()

        res.status(200).json(created)
    } catch (e) {
        res.status(400).json('something wrong')
    }
}

const sendMessage = async (req, res, next) => {
    const id = req.body.chatId;
    const message = req.body.chat;
    try {
        const chat = await Conversation.findById(id)
        chat.messages = [...chat.messages, message]
        const newMessage = await chat.save()
        res.status(200).json(newMessage)
    } catch (e) {
        res.status(400).json(e.message)
    }
}

const getRoom = async (req, res, next) => {
    const { roomId } = req.body
    try {
        const result = await Conversation.findById(roomId)
        res.status(200).json(result)
    } catch (e) {
        res.status(200).json(e)
    }
}

const getConversations = async (req, res, next) => {
    const { userId } = req.body;
    const message = req.body.chat;
    try {
        const result = await Conversation.find({
            "participants.userId": userId
        })
        console.log(result)
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json(e.message)
    }
}

module.exports = { createNewConversation, sendMessage, getConversations, getRoom }