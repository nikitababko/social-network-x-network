import { GLOBALTYPES } from './globalTypes';
import { imageUpload } from 'utils/imageUpload';
import { postDataAPI } from 'utils/fetchData';

export const POST_TYPES = {
  CREATE_POST: 'CREATE_POST',
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
        payload: { payload: res.data.newPost },
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
