import React, { Fragment } from 'react';
import styled from 'styled-components';
import send from '../../images/aol-green.png';

const ChatForm = ({ handleKeyPress, handleClick, inputRef }) => {
  return (
    <Fragment>
      <Input onKeyPress={e => handleKeyPress(e)} ref={inputRef} type="text" />
      <IconGroupChatRoom>
        <Icon onClick={handleClick}>
          <Image />
          <Text>Send</Text>
        </Icon>
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
  font-family: 'Times', serif;
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

const Icon = styled.div`
  width: 72px;
  height: 72px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Image = styled.div`
  width: 40px;
  height: 40px;
  margin: 0;
  background-size: cover;
  background-image: url(${send});
`;

const Text = styled.p`
  color: ${props => props.theme.black};
  margin: 0;
  padding: 0;
`;
