import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import App from './components/App/App';
import { HashRouter } from 'react-router-dom';
import io from 'socket.io-client';
import apiUrl from './apiConfig';
let socket = io.connect(apiUrl);

const appJsx = (
  <HashRouter>
    <App socket={socket} />
  </HashRouter>
);

ReactDOM.render(appJsx, document.getElementById('root'));
