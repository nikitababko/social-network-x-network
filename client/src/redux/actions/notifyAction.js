import { GLOBALTYPES } from './globalTypes';
import {
  deleteDataAPI,
  getDataAPI,
  postDataAPI,
} from '../../utils/fetchData';

export const NOTIFY_TYPES = {
  GET_NOTIFIES: 'GET_NOTIFIES',
  CREATE_NOTIFY: 'CREATE_NOTIFY',
  REMOVE_NOTIFY: 'REMOVE_NOTIFY',
};

export const createNotify =
  ({ message, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await postDataAPI('notify', message, auth.token);

      socket.emit('createNotify', {
        ...res.data.notify,
        user: {
          username: auth.user.username,
          avatar: auth.user.avatar,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.message },
      });
    }
  };

export const removeNotify =
  ({ message, auth, socket }) =>
  async (dispatch) => {
    try {
      await deleteDataAPI(
        `notify/${message.id}?url=${message.url}`,
        auth.token
      );

      socket.emit('removeNotify', message);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  };

export const getNotifies = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('notifies', token);

    dispatch({
      type: NOTIFY_TYPES.GET_NOTIFIES,
      payload: res.data.notifies,
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.message },
    });
  }
};
