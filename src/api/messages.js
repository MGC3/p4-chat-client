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
