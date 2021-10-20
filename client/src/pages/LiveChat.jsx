import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import { afterPostMessage } from '../redux/conversations/actions'
import { useSelector, useDispatch } from 'react-redux'
function LiveChat() {
    let socket
    const [message, setMessage] = useState('')
    const [typing, setTyping] = useState(false)
    const { messages, members, loading, error, name2, currentRoom } = useSelector(state => state.conversations)
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const userId = localStorage.getItem('userId')
    const name = localStorage.getItem('userName')
    const chatroomId = currentRoom
    useEffect(() => {
        socket = socketIOClient("http://localhost:5000");
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId, userId
            });

            socket.on("newMessage", ({ newMessage }) => {
                dispatch(afterPostMessage(newMessage))
            });
            socket.on("typing", user => {
                setTyping(`${user} is typing...`)
            })
            socket.emit("joinRoom", {
                chatroomId, userId
            });
        }
        return () => {
            //Component Unmount
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId,
                });
            }
        };
    }, [messages]);

    useEffect(() => {

        setTimeout(() => {
            setTyping(false)
        }, 5000)
    }, [typing])
    const sendUserAction = (e) => {
        const user = localStorage.getItem('userName')
        setMessage(e.target.value)
        if (socket) {
            socket.emit('typing', user)
        }
    }
    const sendMessage = () => {
        const chatMessage = {
            chatroomId: currentRoom,
            message: { userId: localStorage.getItem('userId'), name, content: message, date: Date.now() },
            userId: localStorage.getItem('userId')
        }
        if (socket) {
            socket.emit("chatroomMessage", chatMessage);
            setMessage("");
        }
    };
    return (
        <>
            {loading && <li>loading</li>}
            {error && <li>{error}</li>}
            {name && <h2>{name}</h2>}
            {typing && <p>{typing}</p>}
            {messages.length === 0 ? <p>no messages yet</p> : (<div className="messages">

                {messages.map((message, i) => (
                    <div className="row">
                        <div className="story">
                            <figure className="story__shape">
                                <img src={message.image} alt={`${message.name}'s img`} class="story__img" />
                                <figcaption className="story__caption">{message.name}</figcaption>
                            </figure >
                            <div className="story__text">
                                <p>
                                    {message.content}
                                </p>
                            </div>
                            <p>
                                {message.userId === userId ? message.views ? 'VV' : 'V' : ''}
                            </p>
                        </div >
                    </div >
                ))
                }
            </div >)}

            <div className="chatroomActions">
                <div>
                    <input
                        type="text"
                        name="message"
                        placeholder="Say something!"
                        onChange={sendUserAction}
                        value={message}
                    />
                </div>
                <div>
                    <button className="join" onClick={sendMessage}>
                        Send
                    </button>
                </div>
            </div>
        </>
    )
}

export default LiveChat
