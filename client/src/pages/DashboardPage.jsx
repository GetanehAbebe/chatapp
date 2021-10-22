import React, { useEffect, useState } from "react";
import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from 'react-redux';
import { allConversations, getRoomChat, createNewConversation } from '../redux/conversations/actions'
import { fetchUsers } from '../redux/contacts/actions'
import { Spinner } from "react-bootstrap";
const { addConversation, getUserConversations } = require('../DAL/index')
const DashboardPage = (props) => {
    const { conversations, error, loading, success } = useSelector(state => state.conversations)
    const { users } = useSelector(state => state.contacts)
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [selectedContacts, setSelectedContacts] = useState([])

    useEffect(() => {
        dispatch(allConversations())
    }, [])

    const joinToRoom = (roomId) => {
        dispatch(getRoomChat(roomId))
        history.push('/newcontact')
    }

    useEffect(() => {
        if (!(users?.length)) dispatch(fetchUsers())
    }, [])
    const addChatroom = async (e) => {
        e.preventDefault()
        dispatch(createNewConversation(name, selectedContacts));
    }
    return (
        <div className="text-center">
            <div className="heading-secondary">Chatrooms</div>
            <div>
                <a href="#popup" className="btn">add conversation</a>
            </div>
            <div >
                {conversations && conversations?.map((item, index) => (
                    <li key={index} className={item.cName || 'nav-list'}>
                        <p onClick={() => joinToRoom(item._id)} >
                            {item.icon}
                            <span>{item.name}</span>
                        </p>
                    </li>

                ))}
            </div>
            <div class="popup" id="popup">
                <form onSubmit={addChatroom}>
                    <div class="popup__content">
                        <div class="popup__right">
                            <a href="#section-tours" class="popup__close">&times;</a>
                            <h2 class="heading-secondary u-margin-bottom-small">add conversation</h2>
                            {error && <h4 className="text-danger">{error}</h4>}
                            {loading && <Spinner animation="border" />}
                            {success && <h4>the conversation created</h4>}
                            <div class="form__group">
                                <input
                                    type="text"
                                    className="form__input"
                                    placeholder="groupe Name"
                                    required
                                    id="group-name"
                                    onChange={e => setName(e.target.value)}
                                />
                                <label for="group-name" class="form__label">Group Name</label>
                            </div>
                            <Multiselect options={users}
                                selectedValue={users}
                                onSelect={(data) => { setSelectedContacts(data) }}
                                onRemove={(data) => { setSelectedContacts(data) }}
                                displayValue={'name'}
                            />
                            <button type="submit" class="btn btn--green u-center-text">
                                create&rarr;
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >

    );
};
export default DashboardPage