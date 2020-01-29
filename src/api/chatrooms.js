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

export const getChatRoom = (chatRoomId, user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chatrooms/' + chatRoomId,
    headers: {
      Authorization: `Token token=${user.token}`
    }
  });
};

export const getChatRooms = user => {
  return axios({
    method: 'GET',
    url: apiUrl + '/chatrooms',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  });
};

export const deleteChatRoom = (chatRoomId, user) => {
  return axios({
    url: apiUrl + '/chatrooms/' + chatRoomId,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  });
};
