import { useEffect, useState } from 'react';
import MyMessage from './MyMessage';
import TheirMessage from './TheirMessage';
import MessageForm from './MessageForm';
import { useSelector, useDispatch } from 'react-redux';
import { io } from "socket.io-client";

const ChatFeed = (props) => {
    const userId = localStorage.getItem('userId')
    const { currentRoom } = useSelector(state => state.conversations)
    const [typing, setTyping] = useState(false)
    // const { chats, activeChat, userName, messages } = props;
    const { messages, members, loading, error, conversations: chats, name: userName, currentRoom: activeChat } = useSelector(state => state.conversations)
    console.log('chat feed', messages, chats, userName, activeChat)
    const chat = messages

    const renderReadReceipts = (message, isMyMessage) => message.viewers && (
        <div
            key={`read_${message.length}`}
            className="read-receipt"
            style={{
                float: isMyMessage ? 'right' : 'left',
                backgroundImage: `url('https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg')`,
            }}
        />
    );


    const renderMessages = () => {
        // const keys = Object.keys(messages);

        return messages.map((key, index) => {
            const message = key;
            const lastMessageKey = index === 0 ? null : message;
            const isMyMessage = message.userId === localStorage.getItem('userId')

            return (
                <div key={`msg_${index}`} style={{ width: '100%' }}>
                    <div className="message-block">
                        {isMyMessage
                            ? <MyMessage message={message} />
                            : <TheirMessage message={message} lastMessage={messages[0]} />}
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft: isMyMessage ? '0px' : '68px' }}>
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            );
        });
    };

    if (!chat) return <div />;
    return (
        <div className="chat-feed ">
            <div className="chat-title-container">
                <div className="chat-title">{chat?.title}</div>
                <div className="chat-subtitle">
                    {chat.map((person) => `${person.userId}`)}
                </div>
            </div>
            <div className='messages-feed'>
                {renderMessages()}
            </div>
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChat} />
            </div>
        </div>
    );
};

export default ChatFeed;