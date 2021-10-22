const { JOIN_FAILURE, JOIN_SUCCESS, REQUEST, ROOM_ID, AFTER_POST_MESSAGE, GET_CONVERSATIONS } = require('./types')
const axios = require('axios')
const userId = localStorage.getItem('userId')


export const getRoomChat = (roomId) => {
    return async (dispatch) => {
        dispatch(request())
        try {
            const response = await axios.post('http://localhost:5000/api/conversation/room', { roomId })
            if (response.data.message) throw response.data.message
            dispatch(joinSuccess(response.data))
        } catch (e) {
            dispatch(joinFailure(e.message))
        }
    }
}

export const allConversations = () => {
    return (dispatch) => {
        dispatch(request())
        axios.post('http://localhost:5000/api/conversation/get', { userId }).then(respnse => {
            dispatch(appendConversations(respnse.data))
        }).catch(e => {
            dispatch(joinFailure(e.message))
        })
    }
}

export const createNewConversation = (name, users) => {
    return (dispatch) => {
        dispatch(request())
        axios.post('http://localhost:5000/api/conversation', { name, userId, users }).then(respnse => {
            dispatch(appendConversations(respnse.data))
        }).catch(e => {
            dispatch(joinFailure(e.message))
        })
    }
}
export const chageRoom = (number) => {
    return {
        type: ROOM_ID,
        payload: number

    }
}

export const request = () => {
    return {
        type: REQUEST
    }
}

export const joinSuccess = users => {
    return {
        type: JOIN_SUCCESS,
        payload: users
    }
}

export const joinFailure = error => {
    return {
        type: JOIN_FAILURE,
        payload: error
    }
}

export function afterPostMessage(data) {

    return {
        type: AFTER_POST_MESSAGE,
        payload: data
    }
}

const appendConversations = data => {
    return {
        type: GET_CONVERSATIONS,
        payload: data
    }
}
