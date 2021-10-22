import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, signup } from '../redux/user/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSync } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'
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
            <div class="row">
                <div class="book">
                    <div class="book__form">
                        <form onSubmit={loginUser} class="form">
                            <div class="u-center-text u-margin-bottom-medium">
                                <h2 class="heading-secondary">Start messaging now</h2>
                                <h2>login</h2>
                                {errorMessage && <h3 className='text-danger'>{errorMessage}</h3>}
                                {loading && <Spinner animation="border" />}
                            </div>
                            <div class="form__group">
                                <input
                                    type="email"
                                    class="form__input"
                                    required
                                    id="email"
                                    placeholder="Email"
                                    onChange={hadleChange}
                                    value={userDetails.email}
                                />
                                <label for="email" class="form__label">Email</label>
                            </div>
                            <div class="form__group">
                                <input
                                    type="password"
                                    class="form__input"
                                    placeholder="Password"
                                    required
                                    id="password"
                                    onChange={hadleChange}
                                    value={userDetails.password}
                                />
                                <label for="email" class="form__label">Password</label>
                            </div>
                            <div class="form__group u-margin-bottom-medium">
                                <div class="form__radio-group">
                                    <input
                                        type="radio"
                                        class="form__radio-input"
                                        id="small"
                                        name="size"
                                    />
                                    <label for="small" class="form__radio-label">
                                        <span class="form__radio-button"></span>remember me</label>
                                </div>
                            </div>
                            <div class="form__group d-flex">
                                <button type="submit" class="btn btn--green u-center-text">
                                    Login&rarr;
                                </button>
                                <Link type="submit" class="btn  u-center-text" to='/register'>
                                    register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div >

        </>
    );
};


export default withRouter(LoginPage);