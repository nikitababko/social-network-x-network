import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Avatar } from 'components';
import { GLOBALTYPES } from 'redux/actions/globalTypes';

import './Status.scss';

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: true,
    });
  };

  return (
    <div className="status my-3 d-flex">
      <Avatar src={auth.user.avatar} size="big-avatar" />

      <button className="status__button flex-fill" onClick={handleOpen}>
        {auth.user.username}, what are you thinking?
      </button>
    </div>
  );
};

export default Status;
