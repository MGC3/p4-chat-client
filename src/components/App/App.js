import React, { Fragment, useState } from 'react';
import { Route } from 'react-router-dom';
import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert';
import DesktopContainer from '../DesktopContainer/DesktopContainer';
import ChatContainer from '../ChatContainer/ChatContainer';
import SignIn from '../SignIn/SignIn';
import TaskBar from '../TaskBar/TaskBar';

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
        render={() => <SignIn alert={alert} setUser={setUser} />}
      />
      <AuthenticatedRoute
        user={user}
        path="/home"
        render={() => (
          <ChatContainer socket={socket} user={user} clearUser={clearUser} />
        )}
      />
      <TaskBar />
    </DesktopContainer>
  );
};

export default App;
