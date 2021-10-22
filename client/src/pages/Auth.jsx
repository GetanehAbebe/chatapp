import React, { useState } from 'react'
import LoginPage from './LoginPage'
import Register from './Register'
import { Link } from 'react-router-dom'
export default function Auth() {
    const [isLogMode, setIsLogMode] = useState(false)

    return (
        <>
            {isLogMode ? <LoginPage /> : <Register />}
            <div class="form__group">
                {!isLogMode ? <>
                    <p> Already have an account?</p>
                    <button type="submit" class="btn  u-center-text">
                        Login
                    </button></> : <>
                    <p> are you new in this site?</p>
                    <Link type="submit" class="btn  u-center-text" to='/register'>
                        register
                    </Link></>}
            </div>
        </>
    )
}
