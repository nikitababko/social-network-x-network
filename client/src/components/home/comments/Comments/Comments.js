import React from 'react';
import CommentDisplay from '../CommentDisplay';

import './Comments.scss';

const Comments = ({ post }) => {
  return (
    <div className="comments">
      {post.comments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} />
      ))}
    </div>
  );
};

export default Comments;
