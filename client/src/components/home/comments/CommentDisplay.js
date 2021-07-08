import React, { useState, useEffect } from 'react';
import CommentCard from './CommentCard';

const CommentDisplay = ({ comment, post, replyComments }) => {
  const [shopReply, setShopReply] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShopReply(replyComments.slice(replyComments.length - next));
  }, [replyComments, next]);

  const handleShow = () => {
    setNext(next + 10);
  };

  const handleHide = () => {
    setNext(1);
  };

  return (
    <div className="comment_display">
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="pl-4">
          {shopReply.map(
            (item, index) =>
              item.reply && (
                <CommentCard
                  key={index}
                  comment={item}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}

          {replyComments.length - next > 0 ? (
            <div
              style={{ cursor: 'pointer', color: 'crimson' }}
              onClick={handleShow}
            >
              See more comments...
            </div>
          ) : (
            replyComments.length > 1 && (
              <div
                style={{ cursor: 'pointer', color: 'crimson' }}
                onClick={handleHide}
              >
                Hide comments...
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
