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
  setChatRoomName,
  history
}) => {
  const [chatRooms, setChatRooms] = useState([]);
  useEffect(() => {
    onGetChatRooms();
  }, []);

  const onGetChatRooms = () => {
    getChatRooms(user)
      .then(res => {
        console.warn(res.data);
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

  const handleClickUpdate = chatRoomId => {
    history.push({ pathname: '/update-chatroom', state: { chatRoomId } });
  };

  return (
    <List>
      <b>ChatRooms</b> <Link to="/create-chatroom">+ Create Room</Link>
      {chatRooms &&
        chatRooms.map(chatRoom => (
          <Room key={chatRoom._id}>
            <RoomName
              onClick={() => handleClickChatRoom(chatRoom._id, chatRoom.name)}
            >
              {chatRoom.name}
            </RoomName>{' '}
            {user._id === chatRoom.owner && (
              <ButtonGroup>
                <span onClick={() => handleDelete(chatRoom._id)}>- Delete</span>

                <span onClick={() => handleClickUpdate(chatRoom._id)}>
                  Update
                </span>
              </ButtonGroup>
            )}
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
  background: ${props => props.theme.white};
  box-shadow: inset 1px 1px 2px 1px rgba(0, 0, 0, 0.45);
  padding: 8px;
  margin: 8px;
`;

const Room = styled.div`
  font-family: 'Times New Roman', Times, serif;
  display: flex;
`;

const RoomName = styled.div`
  cursor: pointer;
  max-width: 100px;
  overflow-wrap: break-word;
`;

const ButtonGroup = styled.div`
  cursor: pointer;
  margin-left: auto;
`;