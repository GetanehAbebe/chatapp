import React, { useState, useEffect } from 'react'
import { addToContacts } from '../DAL/index'
export default function NewContact() {
    const userId = localStorage.getItem('userId')
    const [userDetails, setUserSetails] = useState({})
    const handleSubmit = (e) => {
        e.preventDefault()
        addToContacts(userId, { ...userDetails })
    }

    const handleChange = (e) => {
        setUserSetails({ ...userDetails, [e.target.id]: e.target.value })
    }
    return (
        <div class="row">
            <div class="book">
                <div class="book__form">
                    <form onSubmit={handleSubmit} class="form">
                        <div class="u-center-text u-margin-bottom-medium">
                            <h2 class="heading-secondary">add contact</h2>
                            {/* {errorMessage && <h3 className='text-danger'>{errorMessage}</h3>}
                            {loading && <Spinner animation="border" />} */}
                        </div>
                        <div class="form__group">
                            <input
                                type="text"
                                class="form__input"
                                required
                                id="name"
                                placeholder="name"
                                onChange={handleChange}
                                value={userDetails.name}
                            />
                            <label for="name" class="form__label">name</label>
                        </div>
                        <div class="form__group">
                            <input
                                type="text"
                                class="form__input"
                                placeholder="user id"
                                required
                                id="id"
                                onChange={handleChange}
                                value={userDetails.id}
                            />
                            <label for="id" class="form__label">ID</label>
                        </div>

                        <div class="form__group d-flex">
                            <button type="submit" class="btn btn--green u-center-text">
                                Add&rarr;
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}
