const axios = require('axios');

const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/login', { email, password }, { withCredentials: true })
        console.log('response', response)
        return response.data
    } catch (e) {
        console.log('response', e)
        return e
    }
};

const signUp = async (object) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user/signup', { ...object }, { withCredentials: true })
        return response.data
    } catch (e) {
        console.log(e)
        return e
    }
};

const getUserConversations = async (userId) => {
    const response = await axios.post('http://localhost:5000/api/conversation/get', {
        userId,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    }, {
        withCredentials: true,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    })
    return response.data
};


const getRoomChat = async (roomId) => {
    const response = await axios.post('http://localhost:5000/api/conversation/room', { roomId }, { withCredentials: true })
    // console.log('response',response)
    if (!response.data.message) {
        const numOfMembers = response.data.participants.length
        const viewers = response.data.messages.map(message => {
            const newMessage = { ...message, viewers: (message.viewers.length === numOfMembers) }
            return newMessage
        })
        response.data.messages = viewers

        return response.data
    }
    return response.data
};
const getUserContacts = async (userId) => {
    const response = await axios.post('http://localhost:5000/api/contact', { userId }, { withCredentials: true })
    return response.data
};
const addToContacts = async (userId, users) => {
    const response = await axios.post('http://localhost:5000/api/contact/add', { userId, ...users }, { withCredentials: true })
    return response.data
};


const addConversation = async (name, users) => {
    const userId = localStorage.getItem('userId')
    const participants = [{ name, users, userId }]
    const response = await axios.post('http://localhost:5000/api/conversation', { name, userId, users }, { withCredentials: true })
    return response.data
};

module.exports = {
    login,
    signUp,
    getUserConversations,
    getUserContacts,
    addToContacts,
    getRoomChat,
    addConversation
}