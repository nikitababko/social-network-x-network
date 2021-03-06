import { DeleteData, GLOBALTYPES } from '../actions/globalTypes';
import { deleteDataAPI, getDataAPI, postDataAPI } from 'utils/fetchData';

export const MESS_TYPES = {
  ADD_USER: 'ADD_USER',
  ADD_MESSAGE: 'ADD_MESSAGE',
  GET_CONVERSATIONS: 'GET_CONVERSATIONS',
  GET_MESSAGES: 'GET_MESSAGES',
  UPDATE_MESSAGES: 'UPDATE_MESSAGES',
  DELETE_MESSAGES: 'DELETE_MESSAGES',
  DELETE_CONVERSATION: 'DELETE_CONVERSATION',
  CHECK_ONLINE_OFFLINE: 'CHECK_ONLINE_OFFLINE',
};

export const addMessage =
  ({ message, auth, socket }) =>
  async (dispatch) => {
    dispatch({
      type: MESS_TYPES.ADD_MESSAGE,
      payload: message,
    });

    const { _id, avatar, fullname, username } = auth.user;
    socket.emit('addMessage', {
      ...message,
      user: { _id, avatar, fullname, username },
    });

    try {
      await postDataAPI('message', message, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  };

export const getConversations =
  ({ auth, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `conversations?limit=${page * 9}`,
        auth.token
      );

      let newArr = [];
      res.data.conversations.forEach((item) => {
        item.recipients.forEach((cv) => {
          if (cv._id !== auth.user._id) {
            newArr.push({
              ...cv,
              text: item.text,
              media: item.media,
              call: item.call,
            });
          }
        });
      });

      dispatch({
        type: MESS_TYPES.GET_CONVERSATIONS,
        payload: { newArr, result: res.data.result },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  };

export const getMessages =
  ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = {
        ...res.data,
        messages: res.data.messages.reverse(),
      };

      dispatch({
        type: MESS_TYPES.GET_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.messages },
      });
    }
  };

export const loadMoreMessages =
  ({ auth, id, page = 1 }) =>
  async (dispatch) => {
    try {
      const res = await getDataAPI(
        `message/${id}?limit=${page * 9}`,
        auth.token
      );
      const newData = {
        ...res.data,
        messages: res.data.messages.reverse(),
      };

      dispatch({
        type: MESS_TYPES.UPDATE_MESSAGES,
        payload: { ...newData, _id: id, page },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.messages },
      });
    }
  };

export const deleteMessages =
  ({ message, data, auth }) =>
  async (dispatch) => {
    const newData = DeleteData(data, message._id);
    dispatch({
      type: MESS_TYPES.DELETE_MESSAGES,
      payload: { newData, _id: message.recipient },
    });
    try {
      await deleteDataAPI(`message/${message._id}`, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.message },
      });
    }
  };

export const deleteConversation =
  ({ auth, id }) =>
  async (dispatch) => {
    dispatch({ type: MESS_TYPES.DELETE_CONVERSATION, payload: id });
    try {
      await deleteDataAPI(`conversation/${id}`, auth.token);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
