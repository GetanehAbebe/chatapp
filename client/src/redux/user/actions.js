const axios = require('axios')
const { SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGIN_FAILURE, LOGIN_SUCCESS, REQUEST } = require('../user/types')
export const login = (email, password) => {
    return async (dispatch) => {
        dispatch(request())
        try {
            const response = await axios.post('http://localhost:5000/api/user/login', { email, password })
            console.log('async await', response)

            if (response.data.message) throw response.data.message
            dispatch(loginSuccess(response.data))
            appendToStorage(response.data)
        } catch (e) {
            dispatch(loginFailure(e.message))
        }
    }
}
export const signup = (object) => {
    console.log('form data', object)
    return async (dispatch) => {
        dispatch(request())
        axios.post('http://localhost:5000/api/user/signup', object)
            .then(response => {
                dispatch(signupSuccess(response.data))
                appendToStorage(response.data)
            }).catch(e => {
                dispatch(signupFailure(e.message))
            })
    }
}
export const request = () => {
    return {
        type: REQUEST
    }
}

export const loginSuccess = users => {
    return {
        type: LOGIN_SUCCESS,
        payload: users
    }
}

export const loginFailure = error => {
    return {
        type: LOGIN_FAILURE,
        payload: error
    }
}

export const signupRequest = () => {
    return {
        type: REQUEST
    }
}

export const signupSuccess = users => {
    return {
        type: SIGNUP_SUCCESS,
        payload: users
    }
}

export const signupFailure = error => {
    return {
        type: SIGNUP_FAILURE,
        payload: error
    }
}
export const appendToStorage = user => {
    localStorage.setItem('user-Details', JSON.stringify(user))
    localStorage.setItem('userId', user._id)
    localStorage.setItem('userName', user.firstName)
    localStorage.setItem('token', user.token)
    console.log('success')
    return ''
}