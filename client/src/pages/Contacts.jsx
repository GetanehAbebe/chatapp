import { useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, appendToContacts } from '../redux/contacts/actions'
const Contacts = () => {
    const dispatch = useDispatch()
    const { users, error, loading, success } = useSelector(state => state.contacts)
    const [userId, setUserId] = useState('')
    const [name, setName] = useState('')
    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const addContact = (e) => {
        e.preventDefault()
        dispatch(appendToContacts(name, userId))
    }

    return <>
        <div>
            <a href="#popup" className="btn">add contact</a>
        </div>

        {
            users && users.map((user, i) => {
                return <li key={i} className={user.cName || 'nav-list'}>
                    <p>
                        {user.icon}
                        <span>{user.name}</span>
                    </p>
                </li>
            })

        }

        <div className="popup" id="popup">
            <form onSubmit={addContact}>
                <div className="popup__content">
                    <div className="popup__right">
                        <a href="#section-tours" className="popup__close">&times;</a>
                        <h2 className="heading-secondary u-margin-bottom-small">add contact</h2>
                        {error && <h4 className="text-danger">{error}</h4>}
                        {loading && <Spinner animation="border" />}
                        {success && <h4>the user inserted successfuly</h4>}
                        <div className="form__group">
                            <input
                                type="text"
                                className="form__input"
                                placeholder="groupe Name"
                                required
                                id="group-name"
                                onChange={e => setName(e.target.value)}
                            />
                            <label for="group-name" className="form__label">contact Name</label>
                        </div>
                        <div className="form__group">
                            <input
                                type="text"
                                className="form__input"
                                placeholder="user ID"
                                required
                                id="userId"
                                onChange={e => setUserId(e.target.value)}
                            />
                            <label for="userId" className="form__label">user ID</label>
                        </div>
                        <button type="submit" className="btn btn--green u-center-text">
                            Add&rarr;
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </>

}
export default Contacts