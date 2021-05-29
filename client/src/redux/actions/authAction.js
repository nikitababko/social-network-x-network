import { postDataAPI } from 'utils/fetchData';

export const TYPES = {
  AUTH: 'AUTH',
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: 'NOTIFY',
      payload: {
        loading: true,
      },
    });
    const res = await postDataAPI('login', data);
    console.log(res);
    dispatch({
      type: 'AUTH',
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem('access_token', res.data.access_token);
    dispatch({
      type: 'NOTIFY',
      payload: {
        success: res.data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: 'NOTIFY',
      payload: {
        error: error.response.data.message,
      },
    });
  }
};
