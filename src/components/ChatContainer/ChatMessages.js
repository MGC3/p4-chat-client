import React from 'react';
import styled from 'styled-components';

const ChatMessages = ({ messages }) => {
  return (
    <List>
      {messages &&
        messages.map(message => (
          <Message key={message._id}>
            <ScreenName>{message.owner.screenName}</ScreenName>: {message.text}
          </Message>
        ))}
    </List>
  );
};

export default ChatMessages;

const List = styled.ul`
  padding: 0;
`;

const ScreenName = styled.span`
  color: blue;
`;

const Message = styled.div`
  font-family: 'Times New Roman', Times, serif;
`;
