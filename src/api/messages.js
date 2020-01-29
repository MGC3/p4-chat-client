import apiUrl from '../apiConfig';
import axios from 'axios';

export const getMessages = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/messages',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  });
};

// TODO: remove this if we aren't using it later...
export const getMessage = (id, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/messages/' + id,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  });
};

export const createMessage = (text, user) => {
  return axios({
    url: apiUrl + '/messages',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {
      message: {
        text: text
      }
    }
  });
};
