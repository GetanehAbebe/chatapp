import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../redux/user/actions'
import Card from '../components/UIElemets/Card';
import Register from './Register';
const LoginPage = ({ setupSocket }) => {
    const dispatch = useDispatch()
    const { user, error, loading } = useSelector(state => state.user)
    const [isLoginMode, setIsLoginMode] = useState(true)   // const auth = useContext(AuthContext)
    const [userDetails, setUseDetails] = useState({})
    const history = useHistory()
    const [errorMessage, setErrorMessage] = useState('')


    const hadleChange = (e) => {
        setUseDetails({ ...userDetails, [e.target.id]: e.target.value })
    }

    useEffect(() => {
        if (user) {
            setupSocket()
            history.push("/conversations");
        }
    }, [])
    useEffect(() => {
        if (user) {
            history.push("/conversations");
        } else {
            setErrorMessage(error)
        }
    }, [user, error, loading])
    const loginUser = async (e) => {
        console.log('user', e)
        e.preventDefault()
        const { email, password } = userDetails
        if (isLoginMode) {
            dispatch(login(email, password))
        } else {
            dispatch(signup(userDetails))
        }
    };
    const switchModehandler = () => {
        setIsLoginMode(!isLoginMode)
    }

    return (
        < >
            <h2 >{isLoginMode ? 'Login' : 'Sign-Up'}</h2>
            {errorMessage && <p>{errorMessage}</p>}
            {loading && <p>loading</p>}
            <hr />
            {isLoginMode ? (<form onSubmit={loginUser}>
                <label htmlFor="email"
                    className='form__label'>Email</label>
                <input
                    type="email"
                    name="email"
                    className='form__input'
                    placeholder="abc@example.com"
                    onChange={hadleChange}
                    value={userDetails.email}
                />
                <label htmlFor="password" className='form__label'>Password</label>
                <input
                    type="password"
                    name="password"
                    className='form__input'
                    placeholder="123gggewr"
                    onChange={hadleChange}
                />

                <button type="submit" className='btn btn--green' >{isLoginMode ? 'Login' : 'Sign-Up'}</button>
            </form>) : (<Register />)}
            <button inverse onClick={switchModehandler} className='btn'>Switch to {!isLoginMode ? 'Login' : 'Sign-Up'}</button>
        </>
    );
};


export default withRouter(LoginPage);