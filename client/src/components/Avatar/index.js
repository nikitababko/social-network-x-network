import React from 'react';

import './index.scss';

const index = ({ src, size }) => {
  return <img src={src} alt="Avatar" className={size} />;
};

export default index;
