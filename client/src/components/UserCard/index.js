import React from 'react';
import { Link } from 'react-router-dom';

import { Avatar } from 'components';

const UserCard = ({ user, border, handleClose }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };

  return (
    <div className={`d-flex p-2 align-item-center ${border}`}>
      <Link
        className="d-flex align-item-center"
        to={`/profile/${user._id}`}
        onClick={handleClose}
      >
        <Avatar src={user.avatar} size="big-avatar" />

        <div className="ml-1" style={{ transform: 'translateY(-2px)' }}>
          <span className="d-block">{user.username}</span>
          <small style={{ opacity: 0.7 }}>{user.fullname}</small>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
