import React from 'react';
import { useSelector } from 'react-redux';

import PostCard from 'components/PostCard';

import './Posts.scss';

const Posts = () => {
  const { homePosts } = useSelector((state) => state);
  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
