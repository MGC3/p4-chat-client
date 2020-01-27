import React from 'react';

const ChatMessages = ({ messages }) => {
  return (
    <ul>
      {messages && messages.map((message, idx) => <li key={idx}>{message}</li>)}
    </ul>
  );
};

export default ChatMessages;
