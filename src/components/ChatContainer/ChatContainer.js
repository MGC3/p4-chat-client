import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatForm from './ChatForm';
import ChatMessages from './ChatMessages';
import Draggable from 'react-draggable';
import { createMessage } from '../../api/messages';
import { getChatRoom } from '../../api/chatrooms';
import imsend from '../../audio/imsend.wav';
import imrcv from '../../audio/imrcv.wav';
import dooropen from '../../audio/dooropen.wav';
import doorslam from '../../audio/doorslam.wav';
let imSend = new Audio(imsend);
let imReceive = new Audio(imrcv);
let doorOpen = new Audio(dooropen);
let doorSlam = new Audio(doorslam);

export default function ChatContainer({
  socket,
  user,
  chatRoomId,
  setChatOpen,
  chatRoomName,
  alert
}) {
  const [messages, setMessages] = useState([]);
  const [numClients, setNumClients] = useState(0);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    socket.emit('join chatroom', chatRoomName);
    // if socket.io tells me this chatroom has a new message...
    // get all messages, so I see the new messages
    socket.on('new chat message', () => {
      onGetMessages();
      imReceive.play();
    });

    socket.on('join success', () => {
      doorOpen.play();
    });

    socket.on('count', num => {
      setNumClients(num);
    });

    // when users close the tab/browser window, they don't emit a 'leave chatroom' command, and so our room count will be off.
    // to keep the room count accurate, request an updated count of users in the room when this event occurs.
    socket.on('user force dc', () => {
      socket.emit('request count', chatRoomName);
    });

    socket.on('user left chatroom', () => {
      doorSlam.play();
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
        setMessages(res.data.chatroom.messages);
        scrollToBottom();
      })
      .catch(() => {
        alert({
          heading: 'Failure getting messages',
          message: 'Something went wrong trying to get messages',
          variant: 'danger'
        });
      });
  };

  const handleClick = () => {
    // POST to /messages
    createMessage(inputRef.current.value, chatRoomId, user)
      // then tell socket.io about it
      .then(() => {
        socket.emit('send chat message', chatRoomName);
        onGetMessages();
        imSend.play();
      })
      .catch(() => {
        alert({
          heading: 'Send Message Failure',
          message: 'Something went wrong trying to send messages',
          variant: 'danger'
        });
      });
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
          onGetMessages();
          imSend.play();
        })
        .catch(() => {
          alert({
            heading: 'Send Message Failure',
            message: 'Something went wrong trying to send messages',
            variant: 'danger'
          });
        });
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
          <Icon></Icon>
          <TitleText>
            {chatRoomName}:{' '}
            {numClients > 1
              ? `${numClients} users in this room`
              : '1 user in this room'}
          </TitleText>
          <CloseIcon onClick={() => handleClose()}>X</CloseIcon>
        </TitleBarContainer>
        <ChatMessages messages={messages} bottomRef={bottomRef} user={user} />
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
  height: 482px;
  border: solid ${props => props.theme.XPblue};
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
  color: ${props => props.theme.white};
  /* abstract font into main css typography */
  font-family: 'Tahoma';
  margin-bottom: 0;
  cursor: default;
`;

const Icon = styled.div`
  height: 100%;
  width: 32px;
  margin-right: 32px;
`;

const CloseIcon = styled.button`
  margin-left: auto;
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
