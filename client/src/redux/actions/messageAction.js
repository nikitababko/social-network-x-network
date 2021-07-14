import { GLOBALTYPES } from '../actions/globalTypes';
import { postDataAPI } from 'utils/fetchData';

export const MESS_TYPES = {
  ADD_USER: 'ADD_USER',
  ADD_MESSAGE: 'ADD_MESSAGE',
};

export const addUser =
  ({ user, message }) =>
  async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
      dispatch({ type: MESS_TYPES.ADD_USER, payload: user });
    }
  };

export const addMessage =
  ({ message, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: MESS_TYPES.ADD_MESSAGE, payload: message });

    // const { _id, avatar, fullname, username } = auth.user;
    // socket.emit('addMessage', {
    //   ...message,
    //   user: { _id, avatar, fullname, username },
    // });

    // try {
    //   await postDataAPI('message', message, auth.token);
    // } catch (err) {
    //   dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: err.response.data.message },
    //   });
    // }
  };
