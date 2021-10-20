const { GET_CONVERSATIONS,JOIN_FAILURE, JOIN_SUCCESS, REQUEST, ROOM_ID, AFTER_POST_MESSAGE } = require('./types')

const initialState = {
    currentRoom: '',
    messages: [],
    members: [],
    admin: '',
    loading: false,
    error: '',
    name: '',
    conversations: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                loading: true
            }
        case JOIN_SUCCESS:
            return {
                currentRoom: action.payload._id,
                messages: action.payload.messages,
                members: action.payload.participants,
                admin: action.payload.admin,
                loading: false,
                error: '',
                name: action.payload.name
            }
        case JOIN_FAILURE:
            return {
                messages: [],
                members: [],
                admin: '',
                error: action.payload
            }
        case ROOM_ID:
            return {
                ...state,
                currentRoom: action.payload
            }
        case AFTER_POST_MESSAGE:
            return {
                ...state, messages: [...state.messages, action.payload]
            }

        case GET_CONVERSATIONS:
            return {
                ...state, conversations: action.payload
            }
        default: return state
    }
}

module.exports = reducer