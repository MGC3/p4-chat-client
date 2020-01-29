import React from 'react';
import styled from 'styled-components';

const ChatMessages = ({ messages, bottomRef }) => {
  return (
    <List>
      {messages &&
        messages.map(message => (
          <Message key={message._id}>
            <ScreenName>{message.owner.screenName}</ScreenName>: {message.text}
          </Message>
        ))}
      <div ref={bottomRef}></div>
    </List>
  );
};

export default ChatMessages;

const List = styled.div`
  overflow: scroll;
  height: 250px;
  border: dashed;
  padding: 8px;
  margin: 8px;
`;

const ScreenName = styled.span`
  color: blue;
`;

const Message = styled.div`
  font-family: 'Times New Roman', Times, serif;
`;
