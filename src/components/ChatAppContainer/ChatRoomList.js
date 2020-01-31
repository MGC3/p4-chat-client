import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getChatRooms, deleteChatRoom } from '../../api/chatrooms';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';

const buddies = ['DudeBroChill', 'Bro', 'test', 'Hi', 'Hello', 'test'];

const ChatRoomList = ({
  user,
  setChatRoomId,
  setChatOpen,
  chatOpen,
  setChatRoomName,
  history,
  alert
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
      .catch(() => {
        alert({
          heading: 'Chatroom Failure',
          message: 'Something went wrong trying to get chatrooms',
          variant: 'danger'
        });
      });
  };

  const handleDelete = chatRoomId => {
    deleteChatRoom(chatRoomId, user)
      .then(() => {
        onGetChatRooms();
      })
      .catch(() => {
        alert({
          heading: 'Delete Failure',
          message: 'Something went wrong trying to delete chatroom',
          variant: 'danger'
        });
      });
  };

  const handleClickChatRoom = (chatRoomId, chatRoomName) => {
    // if a current chat window is open, close it
    if (chatOpen) {
      alert({
        heading: 'Chatroom still open',
        message: 'Close out of the chatroom and try again',
        variant: 'info'
      });
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
      <br />
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
                <AiOutlineEdit
                  color="blue"
                  style={{ marginRight: '10' }}
                  onClick={() => handleClickUpdate(chatRoom._id)}
                />
                <FaRegTrashAlt
                  color="red"
                  onClick={() => handleDelete(chatRoom._id)}
                />
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
  max-width: 150px;
  overflow-wrap: break-word;
`;

const ButtonGroup = styled.div`
  cursor: pointer;
  margin-left: auto;
`;
