const {FETCH_CONTACTS_REQUEST,FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE} = require('./types')
const userDetails = JSON.parse(localStorage.getItem('user-Details'))
const initialState = {
    loading: false,
    users: userDetails ? JSON.parse(localStorage.getItem('user-Details')).contacts : [],
    error: ''
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
                error: action.payload
            }
        default: return state
    }
}

module.exports = reducer