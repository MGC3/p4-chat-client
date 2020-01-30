import React, { Fragment } from 'react';
import styled from 'styled-components';

const ChatForm = ({ handleKeyPress, handleClick, inputRef }) => {
  return (
    <Fragment>
      <Input onKeyPress={e => handleKeyPress(e)} ref={inputRef} type="text" />
      <button onClick={handleClick}>Send Message</button>
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
