import React, { useState, useEffect } from 'react';

import PostThumb from 'components/PostThumb/PostThumb';
import LoadMoreButton from 'components/LoadMoreButton';
import LoadIcon from 'images/loading.gif';
import { getDataAPI } from 'utils/fetchData';
import { GLOBALTYPES } from 'redux/actions/globalTypes';
const Saved = ({ auth, dispatch }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(2);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI('get_saved_posts', auth.token)
      .then((res) => {
        setSavedPosts(res.data.savedPosts);
        setResult(res.data.result);
        setLoad(false);
      })
      .catch((error) => {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: error.response.data.message },
        });
      });

    return () => setSavedPosts([]);
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `get_saved_posts?limit=${page * 9}`,
      auth.token
    );
    setSavedPosts(res.data.savedPosts);
    setResult(res.data.result);
    setPage(page + 1);
    setLoad(false);
  };

  return (
    <div>
      <PostThumb posts={savedPosts} result={result} />

      {load && (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
      )}

      <LoadMoreButton
        result={result}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Saved;
