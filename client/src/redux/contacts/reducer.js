const { FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE, FAILURE, SUCCESS, ADD_USER } = require('./types')
const userDetails = JSON.parse(localStorage.getItem('user-Details'))
const initialState = {
    loading: false,
    users: userDetails ? JSON.parse(localStorage.getItem('user-Details')).contacts : [],
    error: '',
    success: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONTACTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_CONTACTS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_CONTACTS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
                success: false
            }
        case ADD_USER:
            return {
                
                loading: false,
                users: action.payload,
                error: '',
                success:true
            }
        case SUCCESS:
            return {
                ...state, success: true,
                loading: false,
                error: ''
            }
        case FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                success: false
            }
        default: return state
    }
}

module.exports = reducer