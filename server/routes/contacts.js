const { Router } = require('express')
const { getContacts, addToContacts, removeFromContacts } = require('../controllers/contacts')
const router = Router();

router.post('/', getContacts)
router.post('/add',addToContacts)
router.post('/remove', removeFromContacts)


module.exports = router