import React from 'react';
import styled from 'styled-components';

const ChatMessages = ({ messages, bottomRef, user }) => {
  return (
    <List>
      {messages &&
        messages.map(message => (
          <Message key={message._id}>
            {message.screenName === user.screenName ? (
              <MyScreenName>{message.screenName}</MyScreenName>
            ) : (
              <ScreenName>{message.screenName}</ScreenName>
            )}
            : {message.text}
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
  padding: 8px;
  margin: 8px;
  background: ${props => props.theme.white};
  box-shadow: inset 1px 1px 2px 1px rgba(0, 0, 0, 0.45);
`;

const MyScreenName = styled.span`
  color: ${props => props.theme.red};
`;

const ScreenName = styled.span`
  color: ${props => props.theme.blue};
`;

const Message = styled.div`
  font-family: 'Times New Roman', Times, serif;
`;
