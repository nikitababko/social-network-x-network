import React from 'react';

const index = ({ auth }) => {
  return <img src={auth.user.avatar} alt="Avatar" className="avatar" />;
};

export default index;
