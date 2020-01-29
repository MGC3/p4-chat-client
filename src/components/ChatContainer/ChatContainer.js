import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import Draggable from 'react-draggable';
import { getMessages, createMessage, getMessage } from '../../api/messages';

export default function ChatContainer({ socket, user }) {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // when socket.io tells me a new message has arrived
    // get all messages again so I see the new messages
    socket.on('newMessage', msg => {
      onGetMessages();
    });

    // when the page first loads, get all messages
    onGetMessages();
  }, []);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView();
  };

  const onGetMessages = () => {
    getMessages(user)
      .then(res => {
        setMessages(res.data.messages);
        scrollToBottom();
      })
      .catch(console.error);
  };

  const handleNewMessage = msg => {
    setMessages(messages => [...messages, msg]);
  };

  const handleClick = () => {
    // POST to /messages
    createMessage(inputRef.current.value, user)
      .then(res => {
        // GET single message at /messages/:id
        return getMessage(res.data.message._id, user);
      })
      .then(res => {
        // set the new message
        handleNewMessage(res.data.message);
      })
      // then tell socket.io about it
      .then(() => {
        socket.emit('chat message', inputRef.current.value);
      });
    inputRef.current.value = '';
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      // stop the enter key from entering a linebreak
      e.preventDefault();
      // POST to /messages
      createMessage(inputRef.current.value, user)
        .then(res => {
          // GET single message at /messages/:id
          return getMessage(res.data.message._id, user);
        })
        .then(res => {
          // set the new message
          handleNewMessage(res.data.message);
        })
        // then tell socket.io about it
        .then(() => {
          socket.emit('chat message', inputRef.current.value);
        });
      inputRef.current.value = '';
    }
  };

  return (
    <Draggable handle=".chat-app-drag" defaultPosition={{ x: 250, y: -380 }}>
      <Container>
        <TitleBarContainer className="chat-app-drag">
          <Icon>X</Icon>
          <TitleText>Instant Messenger | ChatContainer Component</TitleText>
          <CloseIcon>X</CloseIcon>
        </TitleBarContainer>
        <ChatMessages messages={messages} bottomRef={bottomRef} />
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
  color: black;
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
