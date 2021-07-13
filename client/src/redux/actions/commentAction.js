import { DeleteData, EditData, GLOBALTYPES } from './globalTypes';
import { POST_TYPES } from './postAction';
import { deleteDataAPI, patchDataAPI, postDataAPI } from 'utils/fetchData';
import { createNotify, removeNotify } from './notifyAction';

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

      // Notify
      const message = {
        id: res.data.newComment._id,
        text: newComment.reply
          ? 'mentioned you in a comment.'
          : 'has commented on your post.',
        recipients: newComment.reply
          ? [newComment.tag._id]
          : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNotify({ message, auth, socket }));
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

        const message = {
          id: item._id,
          text: comment.reply
            ? 'mentioned you in a comment.'
            : 'has commented on your post.',
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
        };

        dispatch(removeNotify({ message, auth, socket }));
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
