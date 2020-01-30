import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getChatRooms, deleteChatRoom } from '../../api/chatrooms';

const buddies = ['DudeBroChill', 'Bro', 'test', 'Hi', 'Hello', 'test'];

const ChatRoomList = ({
  user,
  setChatRoomId,
  setChatOpen,
  chatOpen,
  setChatRoomName
}) => {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    onGetChatRooms();
  }, []);

  const onGetChatRooms = () => {
    getChatRooms(user)
      .then(res => {
        setChatRooms(res.data.chatrooms);
      })
      .catch(console.error);
  };

  const handleDelete = chatRoomId => {
    deleteChatRoom(chatRoomId, user)
      .then(() => {
        onGetChatRooms();
      })
      .catch(console.error);
  };

  const handleClickChatRoom = (chatRoomId, chatRoomName) => {
    // if a current chat window is open, close it
    if (chatOpen) {
      setChatOpen(false);
    } else {
      // else let the chat window component mount
      setChatRoomId(chatRoomId);
      setChatOpen(true);
      setChatRoomName(chatRoomName);
    }
  };

  return (
    <List>
      <b>ChatRooms</b> <Link to="/create-chatroom">+ Create Room</Link>
      {chatRooms &&
        chatRooms.map(chatRoom => (
          <Room key={chatRoom._id}>
            <span
              onClick={() => handleClickChatRoom(chatRoom._id, chatRoom.name)}
            >
              {chatRoom.name}
            </span>{' '}
            <span onClick={() => handleDelete(chatRoom._id)}>
              - Delete Room
            </span>
          </Room>
        ))}
      <b>Buddies (6/6)</b>
      {buddies &&
        buddies.map((buddie, idx) => <Room key={idx}>Buddy {idx + 1}</Room>)}
    </List>
  );
};

export default ChatRoomList;

const List = styled.div`
  overflow: scroll;
  height: 280px;
  border: dashed;
  padding: 8px;
  margin: 8px;
`;

const Room = styled.div`
  font-family: 'Times New Roman', Times, serif;
`;
