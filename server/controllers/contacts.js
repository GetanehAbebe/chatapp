const User = require('../models/User')



const getContacts = async (req, res, next) => {
    const userId = req.body.userId;
    console.log('arrived to contacts')
    try {
        const contacts = await User.findById(userId)
        console.log('contacts', contacts)
        res.status(200).json(contacts.contacts)
    } catch (e) {
        res.status(400).json({ message: 'something wrong' })
    }
}


const addToContacts = async (req, res, next) => {
    const { id, userId, name } = req.body
    try {
        const user = await User.findById(userId)
        console.log('user', user)
        const newContact = await User.findOne({ id: id })
        console.log('new contact', newContact)
        if (!newContact) {
            throw Error('the Id not exist')
        }
        if (user && newContact) {
            user.contacts = [{ name, userId: id }, ...user.contacts]
        }
        const newContacts = await user.save()
        // console.log(contacts)
        res.status(200).json(newContacts)
    } catch (e) {
        console.log(e.message)
        res.status(200).json({ message: 'there is a problem with an Id key,please write again' })
    }
}
const removeFromContacts = async (req, res, next) => {
    const userId = req.body.userId;
    const contactId = req.body.contactId
    try {
        const user = await User.findOne({ id: userId })
        console.log('user', user)
        const updatedContacts = user["contacts"].filter(contact => contact.userId !== contactId)
        user["contacts"] = updatedContacts
        const contacts = await user.save()
        res.status(200).json(contacts)
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
}

module.exports = {
    getContacts,
    addToContacts,
    removeFromContacts
}