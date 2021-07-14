import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from 'components';

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  message,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  return (
    <div
      className={`d-flex p-2 align-items-center justify-content-between w-100 ${border}`}
    >
      <Link
        className="d-flex align-items-center"
        to={`/profile/${user._id}`}
        onClick={handleCloseAll}
      >
        <Avatar src={user.avatar} size="big-avatar" />

        <div className="ml-1" style={{ transform: 'translateY(-2px)' }}>
          <span className="d-block">{user.username}</span>
          <small style={{ opacity: 0.7 }}>
            {message ? (
              <>
                <div>
                  {user.text}
                  {user.media.length > 0 && (
                    <div>
                      {user.media.length} <i className="fas fa-image" />
                    </div>
                  )}
                </div>
              </>
            ) : (
              user.fullname
            )}
          </small>
        </div>
      </Link>

      {children}
    </div>
  );
};

export default UserCard;
