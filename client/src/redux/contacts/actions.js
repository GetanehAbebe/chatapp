const axios = require('axios')
const { FETCH_CONTACTS_REQUEST, FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_FAILURE } = require('./types')

export const fetchUsers = (email, password) => {
    const userId = localStorage.getItem('userId')
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