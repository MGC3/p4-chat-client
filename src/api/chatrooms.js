import apiUrl from '../apiConfig';
import axios from 'axios';

export const createChatRoom = (chatroom, user) => {
  return axios({
    url: apiUrl + '/chatrooms',
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: {
      chatroom: {
        name: chatroom.name
      }
    }
  });
};
