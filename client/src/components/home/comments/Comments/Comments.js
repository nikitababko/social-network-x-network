import React, { useState, useEffect } from 'react';
import CommentDisplay from '../CommentDisplay';

import './Comments.scss';

const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);

  useEffect(() => {
    const newComments = post.comments.filter((comment) => !comment.reply);
    setComments(newComments);
    setShowComments(newComments.slice(newComments.length - next));
  }, [post.comments, next]);

  const handleShow = () => {
    setNext(next + 10);
  };

  const handleHide = () => {
    setNext(2);
  };

  return (
    <div className="comments">
      {showComments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} />
      ))}

      {comments.length - next > 0 ? (
        <div
          className="p-2 border-top"
          style={{ cursor: 'pointer', color: 'crimson' }}
          onClick={handleShow}
        >
          See more comments...
        </div>
      ) : (
        comments.length > 2 && (
          <div
            className="p-2 border-top"
            style={{ cursor: 'pointer', color: 'crimson' }}
            onClick={handleHide}
          >
            Hide comments...
          </div>
        )
      )}
    </div>
  );
};

export default Comments;
