import React, { useState, Fragment } from 'react';
import { Route } from 'react-router-dom';
import io from 'socket.io-client';

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute';
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert';
import Header from '../Header/Header';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import SignOut from '../SignOut/SignOut';
import ChangePassword from '../ChangePassword/ChangePassword';

const App = () => {
  const [user, setUser] = useState(null);
  const [alerts, setAlerts] = useState([]);
  let socket = io.connect('http://localhost:4741');

  const clearUser = () => setUser(null);

  const alert = ({ heading, message, variant }) => {
    setAlerts(() => [...alerts, { heading, message, variant }]);
  };

  return (
    <Fragment>
      <Header user={user} />
      {alerts.map((alert, index) => (
        <AutoDismissAlert
          key={index}
          heading={alert.heading}
          variant={alert.variant}
          message={alert.message}
        />
      ))}
      <main className="container">
        <Route
          path="/sign-up"
          render={() => <SignUp alert={alert} setUser={setUser} />}
        />
        <Route
          path="/sign-in"
          render={() => <SignIn alert={alert} setUser={setUser} />}
        />
        <AuthenticatedRoute
          user={user}
          path="/sign-out"
          render={() => (
            <SignOut alert={alert} clearUser={clearUser} user={user} />
          )}
        />
        <AuthenticatedRoute
          user={user}
          path="/change-password"
          render={() => <ChangePassword alert={alert} user={user} />}
        />
      </main>
    </Fragment>
  );
};

export default App;
