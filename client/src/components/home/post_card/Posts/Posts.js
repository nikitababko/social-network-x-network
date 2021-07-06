import React from 'react';
import { useSelector } from 'react-redux';

import CardBody from '../CardBody/CardBody';
import CardFooter from '../CardFooter/CardFooter';
import CardHeader from '../CardHeader';

import './Posts.scss';

const Posts = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <div key={post._id} className="card my-3">
          <CardHeader post={post} />
          <CardBody post={post} />
          <CardFooter post={post} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
