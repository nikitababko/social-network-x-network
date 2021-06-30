import React from 'react';
import { useSelector } from 'react-redux';

import { UserCard } from 'components';
import FollowButton from 'components/FollowButton';

import './Follow.scss';

const Followers = ({ users, setShowFollowers }) => {
  const { auth } = useSelector((state) => state);

  const handleClose = () => {
    setShowFollowers(false);
  };

  return (
    <div className="follow">
      <div className="follow__box">
        <h5>Followers</h5>
        <hr />

        {users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            setShowFollowers={setShowFollowers}
          >
            {auth.user._id !== user._id && <FollowButton user={user} />}
          </UserCard>
        ))}

        <div className="follow__close" onClick={handleClose}>
          &times;
        </div>
      </div>
    </div>
  );
};

export default Followers;
