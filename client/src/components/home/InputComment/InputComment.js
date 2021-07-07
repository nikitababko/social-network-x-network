import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createComment } from 'redux/actions/commentAction';

import './InputComment.scss';

const InputComment = ({ children, post }) => {
  const [content, setContent] = useState('');

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setContent('');

    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    };

    dispatch(createComment({ post, newComment, auth }));
  };

  return (
    <form className="card-footer comment_input" onSubmit={handleSubmit}>
      {children}
      <input
        type="text"
        placeholder="Add your comment..."
        value={content}
        onChange={handleChange}
      />

      <button type="submit" className="post-button">
        Post
      </button>
    </form>
  );
};

export default InputComment;