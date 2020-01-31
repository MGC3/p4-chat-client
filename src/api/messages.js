import apiUrl from '../apiConfig';
import axios from 'axios';

export const getMessages = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chatrooms',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  });
};

export const createMessage = (text, chatRoomId, user) => {
  return axios({
    url: apiUrl + '/messages',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {
      message: {
        text: text,
        chatRoomId: chatRoomId,
        screenName: user.screenName
      }
    }
  });
};
