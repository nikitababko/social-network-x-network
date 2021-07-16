import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Avatar } from 'components';
import { imageShow, videoShow } from 'utils/mediaShow';
import { deleteMessages } from 'redux/actions/messageAction';
import Times from './Times';

const MessageDisplay = ({ user, message, theme, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm('Do you want to delete?')) {
      dispatch(deleteMessages({ message, data, auth }));
    }
  };

  return (
    <>
      <div className="chat_title">
        <Avatar src={user.avatar} size="small-avatar" />
        <span>{user.username}</span>
      </div>

      <div className="you_content">
        {user._id === auth.user._id && (
          <i
            className="fas fa-trash text-danger"
            onClick={handleDeleteMessages}
          />
        )}
        <div>
          {message.text && (
            <div
              className="chat_text"
              style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
            >
              {message.text}
            </div>
          )}

          {message.media.map((item, index) => (
            <div key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url, theme)
                : imageShow(item.url, theme)}
            </div>
          ))}
        </div>

        {message.call && (
          <button
            className="btn d-flex align-items-center py-3"
            style={{ background: '#eee', borderRadius: '10px' }}
          >
            <span
              className="material-icons font-weight-bold mr-1"
              style={{
                fontSize: '2.5rem',
                color: message.call.times === 0 ? 'crimson' : 'green',
                filter: theme ? 'invert(1)' : 'invert(0)',
              }}
            >
              {message.call.times === 0
                ? message.call.video
                  ? 'videocam_off'
                  : 'phone_disabled'
                : message.call.video
                ? 'video_camera_front'
                : 'call'}
            </span>

            <div className="text-left">
              <h6>{message.call.video ? 'Video Call' : 'Audio Call'}</h6>
              <small>
                {message.call.times > 0 ? (
                  <Times total={message.call.times} />
                ) : (
                  new Date(message.createdAt).toLocaleTimeString()
                )}
              </small>
            </div>
          </button>
        )}
      </div>

      <div className="chat_time">
        {new Date(message.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MessageDisplay;
