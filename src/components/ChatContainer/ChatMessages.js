import React from 'react';
import styled from 'styled-components';

const ChatMessages = ({ messages }) => {
  return (
    <List>
      {messages &&
        messages.map((message, idx) => (
          <Message key={idx}>
            {message}
            {/* <UserName>{message.username}</UserName>: {message.content} */}
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
