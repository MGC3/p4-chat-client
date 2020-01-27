import React, { useState, useRef } from 'react';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';

export default function ChatContainer({ socket }) {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  const handleClick = () => {
    socket.emit('chat message', inputRef.current.value);
    inputRef.current.value = '';
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      socket.emit('chat message', inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  socket.on('newMessage', msg => {
    setMessages(() => [...messages, msg]);
  });

  return (
    <div>
      <h1>ChatContainer Component</h1>
      <ChatMessages messages={messages} />
      <ChatForm
        handleKeyPress={handleKeyPress}
        inputRef={inputRef}
        handleClick={handleClick}
      />
    </div>
  );
}
