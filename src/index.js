import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import io from 'socket.io-client';
import App from './components/App/App';
import apiUrl from './apiConfig';
import { theme } from './config/theme';
import { ThemeProvider } from 'styled-components';
import './index.scss';

let socket = io.connect(apiUrl);

const appJsx = (
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App socket={socket} />
    </HashRouter>
  </ThemeProvider>
);

ReactDOM.render(appJsx, document.getElementById('root'));
