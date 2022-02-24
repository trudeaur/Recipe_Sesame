import React from 'react';
import Message from '../Message/Message';
import './MessageContainer.css';

const MessageContainer = (props) => {
    return (
        <div className="messageContainer">
            { props.messages.slice(0).reverse().map((message, index) => (
                <Message key={index} content={message.content} isUserMessage={message.isUserMessage} />
            )) }
        </div>
    );
}

export default MessageContainer;