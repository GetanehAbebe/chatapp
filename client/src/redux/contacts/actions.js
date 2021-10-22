const axios = require('axios')
const { FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_FAILURE, ADD_USER, SUCCESS, FAILURE } = require('./types')
const userId = localStorage.getItem('userId')

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest())
        axios.post('http://localhost:5000/api/contact', { userId }).then(response => {
            const users = response.data
            const contacts = {}
            users.forEach(item => {
                contacts[item.userId] = item.name
            })
            console.log('new users', contacts)
            dispatch(fetchUsersSuccess(response.data))
        }).catch(error => {
            dispatch(fetchUsersFailure(error.message))
        })
    }
}


export const appendToContacts = (name, id) => {
    return dispatch => {
        dispatch(fetchUsersRequest())
        axios.post('http://localhost:5000/api/contact/add', { id, userId, name }).then(response => {
            dispatch(appendUser(response.data))
            dispatch(success())
        }).catch(e => {
            dispatch(failue(e.message))
        })
    }
}
export const fetchUsersRequest = () => {
    return {
        type: FETCH_CONTACTS_REQUEST
    }
}

export const fetchUsersSuccess = users => {
    return {
        type: FETCH_CONTACTS_SUCCESS,
        payload: users
    }
}

export const fetchUsersFailure = error => {
    return {
        type: FETCH_CONTACTS_FAILURE,
        payload: error
    }
}
export const appendUser = user => {
    return {
        type: ADD_USER,
        payload: user
    }
}
export const success = user => {
    return {
        type: SUCCESS,
        payload: user
    }
}
export const failue = error => {
    return {
        type: FAILURE,
        payload: error
    }
}