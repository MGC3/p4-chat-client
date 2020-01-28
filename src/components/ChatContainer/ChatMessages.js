import React from 'react';
import styled from 'styled-components';

const messages = [
  { username: 'B username', content: 'a test message' },
  { username: 'A', content: 'a test message' },
  { username: 'B', content: 'a test message' },
  { username: 'A', content: 'a test message' }
];
// const ChatMessages = ({ messages }) => {
const ChatMessages = () => {
  return (
    <List>
      {messages &&
        messages.map((message, idx) => (
          <Message key={idx}>
            <UserName>{message.username}</UserName>: {message.content}
          </Message>
        ))}
    </List>
  );
};

export default ChatMessages;

const List = styled.ul`
  padding: 0;
`;

const UserName = styled.span`
  color: blue;
`;

const Message = styled.div`
  font-family: 'Times New Roman', Times, serif;
`;
