import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Avatar } from 'components';
import { GLOBALTYPES } from 'redux/actions/globalTypes';

const CardHeader = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleEditPost = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: { ...post, onEdit: true },
    });
  };

  return (
    <div className="card__header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="big-avatar" />

        <div className="card__header-name">
          <h6 className="m-0">
            {
              <Link to={`/profile/${post.user._id}`} className="text-dark">
                {post.user.username}
              </Link>
            }
          </h6>

          <small className="text-muted">
            {moment(post.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <div className="nav-item dropdown">
        <span
          className="material-icons"
          id="moreLink"
          data-toggle="dropdown"
        >
          more_horiz
        </span>

        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-icons">create</span> Edit post
              </div>

              <div className="dropdown-item">
                <span className="material-icons">delete_outline</span>{' '}
                Remove post
              </div>
            </>
          )}

          <div className="dropdown-item">
            <span className="material-icons">content_copy</span> Copy link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
