import { useState, useEffect } from 'react';
// import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { io } from "socket.io-client";
import { setupSocket } from '../../redux/socket/actions'
import { afterPostMessage } from '../../redux/conversations/actions'
const isTyping = () => { }
const MessageForm = (props) => {
    const dispatch = useDispatch()
    const userId = localStorage.getItem('userId')
    const { socket } = useSelector(state => state.socket)
    const [value, setValue] = useState('');
    const { chatId, creds } = props;
    const { currentRoom: chatroomId, messages } = useSelector(state => state.conversations)

    const handleChange = (event) => {
        setValue(event.target.value);
        isTyping(props, chatId);
    };


    useEffect(() => {

        if (socket) {
            socket.emit('joinRoom', { chatroomId, userId })
            socket.on("newMessage", ({ newMessage }) => {
                console.log('recieved from the server', newMessage)
                dispatch(afterPostMessage(newMessage))
            });
            socket.on("typing", user => {
                console.log('typing')
            })
        } else { dispatch(setupSocket()) }
        return () => {
            socket.emit('leaveRoom', { chatroomId, userId })
        }
    }, [])
    const sendMessage = (e) => {
        e.preventDefault()
        const chatMessage = {
            chatroomId,
            message: { userId: localStorage.getItem('userId'), content: value, date: Date.now() },
            userId: localStorage.getItem('userId')
        }
        if (socket) {
            socket.emit("chatroomMessage", chatMessage);
            setValue("");
        } else {
            alert('network error')
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const text = value.trim();

        if (text.length > 0) {
            sendMessage(creds, chatId, { text });
        }

        setValue('');
    };

    const handleUpload = (event) => {
        // sendMessage(creds, chatId, { files: event.target.files, text: '' });
    };

    return (
        <form className="message-form" onSubmit={sendMessage}>
            <input
                className="message-input"
                placeholder="Send a message..."
                value={value}
                onChange={handleChange}

            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    picture
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
            <button type="submit" className="send-button">
                send
            </button>
        </form>
    );
};

export default MessageForm;