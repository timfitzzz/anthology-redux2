import fetch from 'isomorphic-fetch';
import request from 'axios';
import User from '../../server/models/user';

export const GET_USER = "GET_USER"

export const getUser(userId) {
  return dispatch => {
    var action = {
      type: GET_USER,
      userId: userId,
      promise: User.isStub === true
               ? request.post('http://127.0.0.1/api/getUser', { userId })
               : User.getUser(userId)
    };
    dispatch(action);
    return action;
  }
}
