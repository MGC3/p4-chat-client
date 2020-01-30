import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import Draggable from 'react-draggable';
import { createMessage } from '../../api/messages';
import { getChatRoom } from '../../api/chatrooms';

export default function ChatContainer({
  socket,
  user,
  chatRoomId,
  setChatOpen,
  chatRoomName
}) {
  const [messages, setMessages] = useState([]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    // if socket.io tells me this chatroom has a new message...
    // get all messages, so I see the new messages
    socket.on('new chat message', () => {
      onGetMessages();
    });

    socket.on('join success', () => {
      console.log('IO knows somebody joined a channel');
    });

    socket.on('user left chatroom', () => {
      console.log('IO knows somebody left this room');
    });

    // when the page first loads, get all messages
    onGetMessages();

    // when the component unmounts, tell socket.io so it can remove us from the room
    return () => {
      socket.emit('leave chatroom', chatRoomName);
    };
  }, []);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView();
  };

  const onGetMessages = () => {
    getChatRoom(chatRoomId, user)
      .then(res => {
        socket.emit('join chatroom', chatRoomName);
        setMessages(res.data.chatroom.messages);
        scrollToBottom();
      })
      .catch(console.error);
  };

  const handleClick = () => {
    // POST to /messages
    createMessage(inputRef.current.value, chatRoomId, user)
      // then tell socket.io about it
      .then(() => {
        socket.emit('send chat message', chatRoomName);
      })
      .catch(() => console.warn('Error creating message'));
    inputRef.current.value = '';
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      // stop the enter key from entering a linebreak
      e.preventDefault();
      // POST to /messages
      createMessage(inputRef.current.value, chatRoomId, user)
        // then tell socket.io about it
        .then(() => {
          socket.emit('send chat message', chatRoomName);
        })
        .catch(() => console.warn('Error creating message'));
      inputRef.current.value = '';
    }
  };

  const handleClose = () => {
    setChatOpen(false);
  };

  return (
    <Draggable handle=".chat-app-drag" defaultPosition={{ x: 250, y: -480 }}>
      <Container>
        <TitleBarContainer className="chat-app-drag">
          <Icon>X</Icon>
          <TitleText>Instant Messenger | {chatRoomName}</TitleText>
          <CloseIcon onClick={() => handleClose()}>X</CloseIcon>
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
  border: solid ${props => props.theme.blue};
  background: ${props => props.theme.grey};
  position: absolute;
`;

/* TODO: abstract to common/shared components */
const TitleBarContainer = styled.div`
  width: 100%;
  height: 32px;
  /* gradient attribution to codepen: https://codepen.io/brundolf/pen/wzrWdy */
  background: linear-gradient(
      to bottom,
      ${props => props.theme.gradientBlue.primary} 0%,
      ${props => props.theme.gradientBlue.secondary} 9%,
      ${props => props.theme.gradientBlue.primary} 18%,
      ${props => props.theme.gradientBlue.primary} 92%,
      ${props => props.theme.gradientBlue.black} 100%
    )
    center/cover no-repeat;
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
  color: ${props => props.theme.white};
  background: linear-gradient(
      to bottom,
      #df4b1d 0%,
      #e67053 9%,
      #df4b1d 18%,
      #e67053 92%,
      #333 100%
    )
    center/cover no-repeat;
`;
