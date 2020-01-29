import React from 'react';
import styled from 'styled-components';

const rooms = ['Hi', 'Hello', 'test', 'Hi', 'Hello', 'test'];
const buddies = ['DudeBroChill', 'Bro', 'test', 'Hi', 'Hello', 'test'];

const ChatRoomList = () => {
  return (
    <List>
      <b>ChatRooms</b>
      {rooms &&
        rooms.map((room, idx) => <Room key={idx}>Chatroom {idx + 1}</Room>)}
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
