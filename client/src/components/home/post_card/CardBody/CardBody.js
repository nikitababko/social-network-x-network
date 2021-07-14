import React, { useState } from 'react';

import { Carousel } from 'components';

import './CardBody.scss';

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <div className="card_body">
      <div
        className="card_body__content"
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? '#fff' : '#111',
        }}
      >
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ' '
            : post.content.slice(0, 60) + '......'}
        </span>

        {post.content.length > 60 && (
          <span className="read-more" onClick={handleReadMore}>
            {readMore ? 'Hide content' : 'Read more'}
          </span>
        )}
      </div>
      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
