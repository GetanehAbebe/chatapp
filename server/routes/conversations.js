const { Router } = require('express')
const { createNewConversation, getRoom, sendMessage, getConversations } = require('../controllers/conversations')


const router = Router();
router.post('/', createNewConversation)
router.post('/send', sendMessage)
router.post('/get', getConversations)
router.post('/room', getRoom)

module.exports = router