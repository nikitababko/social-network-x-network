import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Send from 'images/send.svg';
import LikeButton from 'components/LikeButton';
import ShareModal from 'components/ShareModal';
import {
  likePost,
  savePost,
  unLikePost,
  unSavePost,
} from 'redux/actions/postAction';
import { BASE_URL } from 'utils/config';

import './CardFooter.scss';

const CardFooter = ({ post }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  // Like
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };

  // Saved
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleInShare = () => {
    setIsShare(!isShare);
  };

  return (
    <div className="card_footer">
      <div className="card_footer__menu">
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />

          <Link to={`/post/${post._id}`} className="text-dark">
            <i className="far fa-comment" />
          </Link>

          <img src={Send} alt="Send" onClick={handleInShare} />
        </div>

        {saved ? (
          <i
            className="fas fa-bookmark text-info"
            onClick={handleUnSavePost}
          />
        ) : (
          <i className="far fa-bookmark" onClick={handleSavePost} />
        )}
      </div>

      <div className="d-flex justify-content-between">
        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
          {post.likes.length} likes
        </h6>
        <h6 style={{ padding: '0 25px', cursor: 'pointer' }}>
          {post.comments.length} comments
        </h6>
      </div>

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  );
};

export default CardFooter;
