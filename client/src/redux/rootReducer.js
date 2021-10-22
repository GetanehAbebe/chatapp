
const { combineReducers } = require('redux')
const userReducer = require('../redux/user/reducer')
const contactsReducer = require('../redux/contacts/reducer')
const conversationReducer = require('./conversations/reducer')
const socketReducer = require('../redux/socket/reducer')

const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactsReducer,
    conversations: conversationReducer,
    socket: socketReducer
})
module.exports = rootReducer