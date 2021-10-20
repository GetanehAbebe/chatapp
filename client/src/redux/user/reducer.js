
const { SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_FAILURE, LOGIN_SUCCESS, REQUEST } = require('../user/types')

const initialState = {
    loading: false,
    user: localStorage.getItem('userId'),
    error: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: ''
            }
        case SIGNUP_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: '',
            }
        case LOGIN_FAILURE:
            return {
                loading: false,
                user: '',
                error: action.payload
            }

        case SIGNUP_FAILURE:
            return {
                loading: false,
                user: '',
                error: action.payload
            }
        default: return state
    }
}

module.exports = reducer