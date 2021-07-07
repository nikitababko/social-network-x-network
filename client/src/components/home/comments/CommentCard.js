import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Avatar } from 'components';
import LikeButton from 'components/LikeButton';
import CommentMenu from './CommentMenu';

const CommentCard = ({ comment, post }) => {
  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [islike, setIslike] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setContent(comment.content);
  }, [comment]);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  const handleLike = async () => {
    // if (loadLike) return;
    // setIsLike(true);
    // setLoadLike(true);
    // await dispatch(likePost({ post, auth }));
    // setLoadLike(false);
  };

  const handleUnLike = async () => {
    // if (loadLike) return;
    // setIsLike(false);
    // setLoadLike(true);
    // await dispatch(unLikePost({ post, auth }));
    // setLoadLike(false);
  };

  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? 'inherit' : 'none',
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link
        to={`/profile/${comment.user._id}`}
        className="d-flex text-dark"
      >
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.username}</h6>
      </Link>

      <div className="comment_content">
        <div className="flex-fill">
          <div>
            <span>
              {content.length < 100
                ? content
                : readMore
                ? content + ' '
                : content.slice(0, 100) + '......'}
            </span>
            {content.length > 100 && (
              <span className="read-more" onClick={handleReadMore}>
                {readMore ? ' Hide content' : ' Read more'}
              </span>
            )}
          </div>

          <div style={{ cursor: 'pointer' }}>
            <small className="text-muted mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>

            <small className="font-weight-bold mr-3">
              {comment.likes.length} likes
            </small>

            <small className="font-weight-bold mr-3">reply</small>
          </div>
        </div>

        <div
          className="d-flex align-items-center mx-2"
          style={{ cursor: 'pointer' }}
        >
          <CommentMenu post={post} comment={comment} auth={auth} />
          <LikeButton
            islike={islike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
