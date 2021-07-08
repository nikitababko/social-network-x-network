import React, { useState, useEffect } from 'react';

import { Avatar, FollowButton } from 'components';
import EditProfile from './EditProfile';
import Followers from './Followers';
import Following from './Following';
import { GLOBALTYPES } from 'redux/actions/globalTypes';

const Info = ({ auth, profile, dispatch, id }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (showFollowers || showFollowing || onEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showFollowers, showFollowing, onEdit, dispatch]);

  const handleShowFollowers = () => {
    setShowFollowers(true);
  };

  const handleShowFollowing = () => {
    setShowFollowing(true);
  };

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info__container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />

          <div className="info__content">
            <div className="info__content-title">
              <h2>{user.username}</h2>
              {user._id === auth.user._id ? (
                <button
                  className="btn btn-outline-info"
                  onClick={() => setOnEdit(true)}
                >
                  Edit profile
                </button>
              ) : (
                <FollowButton user={user} />
              )}
            </div>

            <div className="follow-button">
              <span className="mr-4" onClick={handleShowFollowers}>
                {user.followers.length} Followers
              </span>

              <span className="ml-4" onClick={handleShowFollowing}>
                {user.following.length} Following
              </span>
            </div>

            <h6>
              {user.fullname} <p className="text-danger">+{user.mobile}</p>
            </h6>
            <p className="m-0">{user.address}</p>
            <h6 className="m-0">{user.email}</h6>
            <a href={user.website} target="_blank" rel="noreferrer">
              {user.website}
            </a>
            <p>{user.story}</p>
          </div>

          {onEdit && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}

          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
