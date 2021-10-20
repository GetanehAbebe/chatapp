import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from 'react-redux';
import { allConversations, getRoomChat } from '../redux/conversations/actions'
const { addConversation, getUserConversations } = require('../DAL/index')
const DashboardPage = (props) => {
    const { conversations } = useSelector(state => state.conversations)
    const history = useHistory()
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    useEffect(() => {
        dispatch(allConversations())
    }, [])

    const joinToRoom = (roomId) => {
        dispatch(getRoomChat(roomId))
        history.push('/chatroom')
    }
    useEffect(async () => {
        const userId = localStorage.getItem('userId')
        const conversations = await getUserConversations(userId)
        setChatrooms(conversations)
    }, []);

    const addChatroom = async () => {
        const result = await addConversation(name);
    }
    return (
        <div >
            <div className="cardHeader">Chatrooms</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="chatroomName">Chatroom Name</label>
                    <input
                        type="text"
                        name="chatroomName"
                        id="chatroomName"
                        className="input"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="ChatterBox Nepal"
                    />
                </div>
            </div>
            <button onClick={addChatroom} className="heading-secondary">Create Chatroom</button>
            <div className="chatrooms">
                {conversations && conversations.map((chatroom) => (
                    <div key={chatroom._id} >
                        <div className="d-flex center">
                            <h4 className="heading-tertiary card__heading-span">{chatroom.name || chatroom._id}</h4>
                            <button className=" btn btn--green" onClick={() => joinToRoom(chatroom._id)}>Join</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default DashboardPage