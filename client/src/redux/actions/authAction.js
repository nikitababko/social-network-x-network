import { GLOBALTYPES } from './globalTypes';
import { postDataAPI } from 'utils/fetchData';

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true,
      },
    });
    const res = await postDataAPI('login', data);
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem('firstLogin', true);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: error.response.data.message,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin');
  if (firstLogin) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    try {
      const res = await postDataAPI('refresh_token');
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {},
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  }
};
