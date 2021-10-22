const Conversation = require('../models/conversations')

const createNewConversation = async (req, res, next) => {
    const { name, userId, users } = req.body
    console.log('users from the front end', users)
    try {
        const addConversation = await new Conversation({
            admin: userId,
            name,
            participants: users,

        })
        addConversation.messages = []
        const created = await addConversation.save()

        res.status(200).json(created)
    } catch (e) {
        res.status(400).json('something wrong')
    }
}

const sendMessage = async (req, res, next) => {
    console.log('respnse', req.body)
    const id = req.body.cahtId;
    const message = req.body.chat;
    try {
        const chat = await Conversation.findById(id)
        console.log('chat', chat)
        chat.messages = [...chat.messages, { userId: '6170272d5d4e6a4d94fed60f', content: message }]
        const newMessage = await chat.save()
        console.log('new message', newMessage)
        res.status(200).json(newMessage)
    } catch (e) {
        console.log(e)
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
            $or: [{ "participants.userId": userId }, { admin: userId }]

        })
        console.log(result)
        res.status(200).json(result)
    } catch (e) {
        res.status(400).json(e.message)
    }
}

module.exports = { createNewConversation, sendMessage, getConversations, getRoom }