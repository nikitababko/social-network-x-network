import React from 'react';
import { useSelector } from 'react-redux';

import { UserCard } from 'components';
import FollowButton from 'components/FollowButton';

import './Follow.scss';

const Following = ({ users, setShowFollowing }) => {
  const { auth } = useSelector((state) => state);

  const handleClose = () => {
    setShowFollowing(false);
  };

  return (
    <div className="follow">
      <div className="follow__box">
        <h5>Following</h5>
        <hr />

        <div className="follow_content">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowing={setShowFollowing}
            >
              {auth.user._id !== user._id && <FollowButton user={user} />}
            </UserCard>
          ))}
        </div>

        <div className="follow__close" onClick={handleClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Following;
