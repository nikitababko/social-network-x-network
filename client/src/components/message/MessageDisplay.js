import React from 'react';

import { Avatar } from 'components';

const MessageDisplay = ({ user }) => {
  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>

      <div className="chat_text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
        fugiat.
      </div>

      <div className="chat_time">April 2021</div>
    </>
  );
};

export default MessageDisplay;
