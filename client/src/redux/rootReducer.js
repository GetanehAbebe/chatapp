
const { combineReducers } = require('redux')
const userReducer = require('../redux/user/reducer')
const contactsReducer = require('../redux/contacts/reducer')
const conversationReducer = require('./conversations/reducer')

const rootReducer = combineReducers({
    user: userReducer,
    contacts: contactsReducer,
    conversations: conversationReducer,
})
module.exports = rootReducer