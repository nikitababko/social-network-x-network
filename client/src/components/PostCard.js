import React from 'react';

import CardBody from './home/post_card/CardBody/CardBody';
import CardFooter from './home/post_card/CardFooter/CardFooter';
import CardHeader from './home/post_card/CardHeader';
import Comments from './home/comments/Comments/Comments';
import InputComment from './home/InputComment/InputComment';

const PostCard = ({ post }) => {
  return (
    <div className="card my-3">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />

      <Comments post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default PostCard;
