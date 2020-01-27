import React from 'react';
import DesktopContainer from '../DesktopContainer/DesktopContainer';
import ChatContainer from '../ChatContainer/ChatContainer';

const App = ({ socket }) => {
  return (
    <DesktopContainer>
      <h1>Test</h1>
      <ChatContainer socket={socket} />
    </DesktopContainer>
  );
};

export default App;
