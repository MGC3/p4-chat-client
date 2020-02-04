import React, { Fragment } from 'react';
import styled from 'styled-components';
import send from '../../images/aol-green.png';

const ChatForm = ({ handleKeyPress, handleClick, inputRef }) => {
  return (
    <Fragment>
      <Input onKeyPress={e => handleKeyPress(e)} ref={inputRef} type="text" />
      <IconGroupChatRoom>
        <TestIcon onClick={handleClick}>
          <TestImage />
          <TestText>Send</TestText>
        </TestIcon>
      </IconGroupChatRoom>
    </Fragment>
  );
};

export default ChatForm;

const Input = styled.textarea`
  background: ${props => props.theme.white};
  box-shadow: inset 1px 1px 2px 1px rgba(0, 0, 0, 0.45);
  padding: 8px;
  margin: 8px;
  /* TODO: shouldn't hard code this, but good enough for now */
  width: 478px;
`;

const IconGroupChatRoom = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  margin: 16px 0;
  padding: 0 8px;
`;

const TestIcon = styled.div`
  width: 72px;
  height: 72px;
  border: 1px solid grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Times', serif;

  cursor: pointer;
`;

const TestImage = styled.div`
  width: 40px;
  height: 40px;
  margin: 0;
  background-size: cover;
  background-image: url(${send});
`;

const TestText = styled.p`
  color: black;
  font-weight: 700;
  margin: 0;
  padding: 0;
`;
