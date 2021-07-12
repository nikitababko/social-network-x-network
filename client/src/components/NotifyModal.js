import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import NoNotice from 'images/notice.png';
import { Avatar } from 'components';

const NotifyModal = () => {
  const { auth, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div style={{ minWidth: '280px' }}>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h3>Notification</h3>
        {notify.sound ? (
          <i
            className="fas fa-bell text-dander"
            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
          />
        ) : (
          <i
            className="fas fa-bell-slash text-danger"
            style={{ fontSize: '1.2rem', cursor: 'pointer' }}
          />
        )}
      </div>

      <hr className="mt-0" />

      {notify.data.length === 0 && (
        <img src={NoNotice} alt="NoNotice" className="w-100" />
      )}

      <div style={{ maxHeight: 'calc(100vh - 200px)', overflow: 'auto' }}>
        {notify.data.map((message, index) => (
          <div key={index} className="px-2 mb-3">
            <Link
              to={`${message.url}`}
              className="d-flex text-dark align-items-center"
            >
              <Avatar src={message.user.avatar} size="big-avatar" />

              <div className="mx-1 flex-fill">
                <div>
                  <strong className="mr-1">{message.user.username}</strong>
                  <span>{message.text}</span>
                </div>
                {message.content && (
                  <small>{message.content.slice(0, 20)}...</small>
                )}
              </div>

              <div style={{ width: '30px' }}>
                {message.image && (
                  <Avatar src={message.image} size="medium-avatar" />
                )}
              </div>
            </Link>

            <small className="text-muted d-flex justify-content-between px-2">
              {moment(message.createdAt).fromNow()}

              {!message.isRead && (
                <i className="fas fa-circle text-primary" />
              )}
            </small>
          </div>
        ))}
      </div>

      <hr className="my-1" />

      <div
        className="text-right text-danger mr-2"
        style={{ cursor: 'pointer' }}
      >
        Delete all
      </div>
    </div>
  );
};

export default NotifyModal;
