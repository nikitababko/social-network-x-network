import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PostCard from 'components/PostCard';
import LoadMoreButton from 'components/LoadMoreButton';
import LoadIcon from 'images/loading.gif';
import { PROFILE_TYPES } from 'redux/actions/profileAction';
import { getDataAPI } from 'utils/fetchData';

import './Posts.scss';
import { POST_TYPES } from 'redux/actions/postAction';

const Posts = () => {
  const { homePosts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);

    const res = await getDataAPI(
      `posts?limit=${homePosts.page * 9}`,
      auth.token
    );
    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    });

    setLoad(false);
  };
  return (
    <div className="posts">
      {homePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}

      {load && (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
      )}

      <LoadMoreButton
        result={homePosts.result}
        page={homePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
