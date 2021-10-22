const { io } = require('socket.io-client')
const { SOCKET_REQUEST,
    SOCKET_SUCCESS,
    SOCKET_FAILURE } = require('./actions')


const initialState = {
    socket: io("http://localhost:5000", {
        query: {
            token: localStorage.getItem("token"),
        },
    }),
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SOCKET_SUCCESS:
            return {
                socket: action.payload,
                error: ''
            }
        case SOCKET_FAILURE:
            return {
                socket: '',
                error: action.payload
            }

        default: return state
    }
}

module.exports = reducer
