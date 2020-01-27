import React, { Fragment } from 'react';

const ChatForm = ({ handleKeyPress, handleClick, inputRef }) => {
  return (
    <Fragment>
      <textarea
        onKeyPress={e => handleKeyPress(e)}
        ref={inputRef}
        type="text"
      />
      <button onClick={handleClick}>Send Message</button>
    </Fragment>
  );
};

export default ChatForm;
