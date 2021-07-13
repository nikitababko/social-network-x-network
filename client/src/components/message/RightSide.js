import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import UserCard from 'components/UserCard';
import MessageDisplay from './MessageDisplay';

const RightSide = () => {
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();

  const [user, setUser] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const newData = message.users.find((item) => item._id === id);
    if (newData) {
      setUser(newData);
      // setResult(newData.result);
      // setPage(newData.page);
    }
  }, [message.data, id]);

  const onChangeText = (e) => {
    setText(e.target.value);
  };

  return (
    <>
      <div className="message_header">
        <UserCard user={user}>
          <div>
            <i
              className="fas fa-trash text-danger"
              // onClick={handleDeleteConversation}
            />
          </div>
        </UserCard>
      </div>

      <div className="chat_container">
        <div className="chat_display">
          <div className="chat_row other_message">
            <MessageDisplay user={user} />
          </div>

          <div className="chat_row you_message">
            <MessageDisplay user={auth.user} />
          </div>
        </div>
      </div>

      <form className="chat_input">
        <input
          type="text"
          placeholder="Enter your message..."
          value={text}
          onChange={onChangeText}
        />

        <button
          type="submit"
          className="material-icons"
          disabled={text ? false : true}
        >
          near_me
        </button>
      </form>
    </>
  );
};

export default RightSide;
