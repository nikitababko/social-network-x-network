import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from 'utils/imageUpload';
import { getDataAPI, patchDataAPI, postDataAPI } from 'utils/fetchData';

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
  LOADING_POST: 'LOADING_POST',
  GET_POSTS: 'GET_POSTS',
  UPDATE_POST: 'UPDATE_POST',
};

export const createPost =
  ({ content, images, auth }) =>
  async (dispatch) => {
    let media = [];

    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      if (images.length > 0) {
        media = await imageUpload(images);
      }

      const res = await postDataAPI(
        'posts',
        { content, images: media },
        auth.token
      );

      dispatch({
        type: POST_TYPES.CREATE_POST,
        payload: { ...res.data.newPost, user: auth.user },
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: false },
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

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: true,
    });

    const res = await getDataAPI('posts', token);
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: res.data,
    });

    dispatch({
      type: POST_TYPES.LOADING_POST,
      payload: false,
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

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const imageNewUrl = images.filter((image) => !image.url);
    const imageOldwUrl = images.filter((image) => image.url);

    if (
      status.content === content &&
      imageNewUrl.length === 0 &&
      imageOldwUrl.length === status.images.length
    )
      return;

    try {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { loading: true },
      });

      if (imageNewUrl.length > 0) {
        media = await imageUpload(imageNewUrl);
      }
      const res = await patchDataAPI(
        `post/${status._id}`,
        { content, images: [...imageOldwUrl, ...media] },
        auth.token
      );

      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: res.data.newPost,
      });

      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { success: res.data.message },
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
