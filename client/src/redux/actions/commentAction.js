import { DeleteData, EditData, GLOBALTYPES } from './globalTypes';
import { POST_TYPES } from './postAction';
import { deleteDataAPI, patchDataAPI, postDataAPI } from 'utils/fetchData';

export const createComment =
  ({ post, newComment, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };
    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };
      const res = await postDataAPI('comment', data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };
      const newPost = { ...post, comments: [...post.comments, newData] };
      dispatch({
        type: POST_TYPES.UPDATE_POST,
        payload: newPost,
      });

      // Socket
      socket.emit('createComment', newPost);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  };

export const updateComment =
  ({ comment, post, content, auth }) =>
  async (dispatch) => {
    const newComments = EditData(post.comments, comment._id, {
      ...comment,
      content,
    });
    const newPost = { ...post, comments: newComments };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    try {
      await patchDataAPI(
        `comment/${comment._id}`,
        { content },
        auth.token
      );
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  };

export const likeComment =
  ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: [...comment.likes, auth.user],
    };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    try {
      await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  };

export const unLikeComment =
  ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: DeleteData(comment.likes, auth.user._id),
    };

    const newComments = EditData(post.comments, comment._id, newComment);

    const newPost = { ...post, comments: newComments };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    try {
      await patchDataAPI(
        `comment/${comment._id}/unlike`,
        null,
        auth.token
      );
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  };

export const deleteComment =
  ({ post, comment, auth, socket }) =>
  async (dispatch) => {
    let commentId = comment._id;

    const deleteArr = [
      ...post.comments.filter((comment) => comment.reply === commentId),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (comment) => !deleteArr.find((da) => comment._id === da._id)
      ),
    };

    dispatch({
      type: POST_TYPES.UPDATE_POST,
      payload: newPost,
    });

    socket.emit('deleteComment', newPost);
    try {
      deleteArr.forEach((item) => {
        deleteDataAPI(`comment/${item._id}`, auth.token);
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
