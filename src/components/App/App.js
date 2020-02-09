import React, { useState, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { AuthenticatedRoute } from '../AuthenticatedRoute';
import { AutoDismissAlert, AlertContainer } from '../AutoDismissAlert';
import { DesktopContainer } from '../DesktopContainer';
import { IconGrid } from '../IconGrid';
import { ChatContainer } from '../ChatContainer';
import { SignIn, SignOut, SignUp, ChangePassword } from '../Auth';
import { StartMenu } from '../StartMenu';
import { TaskBar } from '../TaskBar';
import { ChatAppContainer, ChatRoomList } from '../ChatAppContainer';
import { CreateChatRoom } from '../CreateChatRoom';
import { UpdateChatRoom } from '../UpdateChatRoom';

const App = ({ socket }) => {
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatRoomName, setChatRoomName] = useState('');

  const toggleStart = () => {
    startMenuOpen ? setStartMenuOpen(false) : setStartMenuOpen(true);
  };

  const clearUser = () => setUser(null);

  const alert = ({ heading, message, variant }) => {
    setAlerts(() => [...alerts, { heading, message, variant }]);
  };

  return (
    <DesktopContainer>
      <AlertContainer>
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
      </AlertContainer>
      <Route
        exact
        path="/"
        render={() => (
          <ChatAppContainer>
            <SignIn alert={alert} setUser={setUser} />
          </ChatAppContainer>
        )}
      />
      <Route
        exact
        path="/sign-up"
        render={() => (
          <ChatAppContainer>
            <SignUp alert={alert} setUser={setUser} />
          </ChatAppContainer>
        )}
      />
      <AuthenticatedRoute
        user={user}
        path="/home"
        render={({ history }) => (
          <Fragment>
            <ChatAppContainer user={user}>
              <ChatRoomList
                user={user}
                alert={alert}
                history={history}
                chatOpen={chatOpen}
                setChatOpen={setChatOpen}
                setChatRoomId={setChatRoomId}
                setChatRoomName={setChatRoomName}
              />
            </ChatAppContainer>
            {chatOpen && chatRoomId && (
              <ChatContainer
                socket={socket}
                alert={alert}
                chatRoomId={chatRoomId}
                setChatOpen={setChatOpen}
                user={user}
                chatRoomName={chatRoomName}
              />
            )}
          </Fragment>
        )}
      />
      <AuthenticatedRoute
        user={user}
        path="/create-chatroom"
        render={() => (
          <ChatAppContainer>
            <CreateChatRoom user={user} alert={alert} />
          </ChatAppContainer>
        )}
      />
      <AuthenticatedRoute
        user={user}
        path="/update-chatroom"
        render={() => (
          <ChatAppContainer>
            <UpdateChatRoom user={user} alert={alert} />
          </ChatAppContainer>
        )}
      />
      <AuthenticatedRoute
        user={user}
        path="/change-password"
        render={() => (
          <ChatAppContainer>
            <ChangePassword user={user} alert={alert} />
          </ChatAppContainer>
        )}
      />
      <AuthenticatedRoute
        user={user}
        path="/sign-out"
        render={() => (
          <SignOut alert={alert} clearUser={clearUser} user={user} />
        )}
      />
      <IconGrid />
      {startMenuOpen && <StartMenu />}
      <TaskBar toggleStart={toggleStart} />
    </DesktopContainer>
  );
};

export default App;
