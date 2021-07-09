import React from 'react';

const LoadMoreButton = ({ result, page, load, handleLoadMore }) => {
  return (
    <>
      {result < 9 * (page - 1)
        ? ''
        : !load && (
            <button
              className="btn btn-dark load_more mx-auto d-block"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
    </>
  );
};

export default LoadMoreButton;
