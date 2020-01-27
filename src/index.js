import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './components/App/App';
import { HashRouter } from 'react-router-dom';
import io from 'socket.io-client';
let socket = io.connect('http://localhost:4741');

const appJsx = (
  <HashRouter>
    <App socket={socket} />
  </HashRouter>
);

ReactDOM.render(appJsx, document.getElementById('root'));
