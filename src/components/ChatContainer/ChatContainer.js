import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import Draggable from 'react-draggable';

export default function ChatContainer({ socket }) {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    socket.on('newMessage', msg => {
      handleNewMessage(msg);
    });
  }, []);

  const handleNewMessage = msg => {
    setMessages(messages => [...messages, msg]);
  };

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

  return (
    <Draggable handle=".chat-app-drag" defaultPosition={{ x: 250, y: -380 }}>
      <Container>
        <TitleBarContainer className="chat-app-drag">
          <Icon>X</Icon>
          <TitleText>Instant Messenger</TitleText>
          <CloseIcon>X</CloseIcon>
        </TitleBarContainer>
        <h1>ChatContainer Component</h1>
        <ChatMessages messages={messages} />
        <ChatForm
          handleKeyPress={handleKeyPress}
          inputRef={inputRef}
          handleClick={handleClick}
        />
      </Container>
    </Draggable>
  );
}

const Container = styled.div`
  width: 500px;
  height: 450px;
  border: dashed;
  position: absolute;
  overflow: scroll;
`;

const TitleBarContainer = styled.div`
  width: 100%;
  height: 32px;
  border: dashed;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  align-items: center;
`;

const TitleText = styled.p`
  color: white;
  /* abstract font into main css typography */
  font-family: 'Tahoma';
`;

const Icon = styled.div`
  /* test styles delete */
  border: dashed pink;
  height: 100%;
  width: 32px;
  margin-right: 32px;
`;

const CloseIcon = styled.button`
  margin-left: auto;
  /* test styles delete */
  height: 100%;
  width: 32px;
  color: black;
`;
