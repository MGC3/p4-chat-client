import React, { Fragment, useState } from 'react';
import { Route } from 'react-router-dom';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert';
import DesktopContainer from '../DesktopContainer/DesktopContainer';
import ChatContainer from '../ChatContainer/ChatContainer';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import TaskBar from '../TaskBar/TaskBar';
import ChatAppContainer from '../ChatAppContainer/ChatAppContainer';
import ChatRoomList from '../ChatAppContainer/ChatRoomList';
import CreateChatRoom from '../CreateChatRoom/CreateChatRoom';

const App = ({ socket }) => {
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState([]);

  const clearUser = () => setUser(null);

  const alert = ({ heading, message, variant }) => {
    setAlerts(() => [...alerts, { heading, message, variant }]);
  };

  return (
    <DesktopContainer>
      {alerts.map((alert, index) => (
        <AutoDismissAlert
          key={index}
          heading={alert.heading}
          variant={alert.variant}
          message={alert.message}
        />
      ))}
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
        render={() => (
          <div>
            <ChatAppContainer>
              <ChatRoomList />
            </ChatAppContainer>
            <ChatContainer socket={socket} user={user} clearUser={clearUser} />
          </div>
        )}
      />
      <AuthenticatedRoute
        user={user}
        path="/create-chatroom"
        render={() => (
          <div>
            <ChatAppContainer>
              <CreateChatRoom user={user} alert={alert} clearUser={clearUser} />
            </ChatAppContainer>
            <ChatContainer
              alert={alert}
              socket={socket}
              user={user}
              clearUser={clearUser}
            />
          </div>
        )}
      />

      <TaskBar />
    </DesktopContainer>
  );
};

export default App;
