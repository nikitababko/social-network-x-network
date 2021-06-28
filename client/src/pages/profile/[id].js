import React from 'react';
import { useSelector } from 'react-redux';

import Info from 'components/profile/Info';
import Posts from 'components/profile/Posts';
import LoadIcon from 'images/loading.gif';

import './index.scss';

const Profile = () => {
  const { profile } = useSelector((state) => state);

  return (
    <div className="profile">
      {profile.loading ? (
        <img src={LoadIcon} alt="Loading..." />
      ) : (
        <Info />
      )}

      <Posts />
    </div>
  );
};

export default Profile;
