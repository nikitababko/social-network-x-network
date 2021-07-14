import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import UserCard from 'components/UserCard';
import MessageDisplay from './MessageDisplay';
import Icons from 'components/Icons';
import { GLOBALTYPES } from 'redux/actions/globalTypes';
import { imageShow, videoShow } from 'utils/mediaShow';
import { imageUpload } from 'utils/imageUpload';
import { addMessage, getMessages } from 'redux/actions/messageAction';
import LoadIcon from 'images/loading.gif';

const RightSide = () => {
  const { auth, message, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [text, setText] = useState('');
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  useEffect(() => {
    const newData = message.users.find((item) => item._id === id);
    if (newData) {
      setUser(newData);
    }
  }, [message.data, id]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let error = '';
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (error = 'File does not exist.');

      if (file.size > 1024 * 1024 * 5) {
        return (error = 'The image/video largest is 5mb.');
      }

      return newMedia.push(file);
    });

    if (error) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error } });
    }
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() && media.length === 0) return;
    setText('');
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const message = {
      sender: auth.user._id,
      recipient: id,
      text,
      media: newArr,
      createdAt: new Date().toISOString(),
    };

    setLoadMedia(false);
    await dispatch(addMessage({ message, auth, socket }));
  };

  useEffect(() => {
    if (id) {
      const getMessagesData = async () => {
        await dispatch(getMessages({ auth, id }));
      };
      getMessagesData();
    }
  }, [id, dispatch, auth]);

  return (
    <>
      <div className="message_header">
        {user.length !== 0 && (
          <UserCard user={user}>
            <div>
              <i className="fas fa-trash text-danger" />
            </div>
          </UserCard>
        )}
      </div>

      <div
        className="chat_container"
        style={{ height: media.length > 0 ? 'calc(100% - 180px)' : '' }}
      >
        <div className="chat_display">
          {message.data.map((message, index) => (
            <div key={index}>
              {message.sender !== auth.user._id && (
                <div className="chat_row other_message">
                  <MessageDisplay
                    user={user}
                    message={message}
                    theme={theme}
                  />
                </div>
              )}

              {message.sender === auth.user._id && (
                <div className="chat_row you_message">
                  <MessageDisplay
                    user={auth.user}
                    message={message}
                    theme={theme}
                  />
                </div>
              )}
            </div>
          ))}

          {loadMedia && (
            <div className="chat_row you_message">
              <img src={LoadIcon} alt="loading" />
            </div>
          )}
        </div>
      </div>

      <div
        className="show_media"
        style={{ display: media.length > 0 ? 'grid' : 'none' }}
      >
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item), theme)
              : imageShow(URL.createObjectURL(item), theme)}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>

      <form className="chat_input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={onChangeText}
          style={{
            filter: theme ? 'invert(1)' : 'invert(0)',
            background: theme ? '#040404' : '',
            color: theme ? 'white' : '',
          }}
        />

        <Icons setContent={setText} content={text} theme={theme} />

        <div className="file_upload">
          <i className="fas fa-image text-danger" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*"
            onChange={handleChangeMedia}
          />
        </div>

        <button
          type="submit"
          className="material-icons"
          disabled={text || media.length > 0 ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  );
};

export default RightSide;
