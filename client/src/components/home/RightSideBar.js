import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserCard from 'components/UserCard';
import LoadIcon from 'images/loading.gif';
import FollowButton from 'components/FollowButton';
import { getSuggestions } from 'redux/actions/suggestionsAction';

const RightSideBar = () => {
  const { auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRedo = () => {
    dispatch(getSuggestions(auth.token));
  };

  return (
    <div className="mt-3">
      <UserCard user={auth.user} />

      <div className="d-flex justify-content-between align-items-center my-2">
        <h5 className="text-danger">Suggestions for you</h5>
        {!suggestions.loading && (
          <i
            className="fas fa-redo"
            style={{ cursor: 'pointer' }}
            onClick={handleRedo}
          />
        )}
      </div>

      {suggestions.loading ? (
        <img
          src={LoadIcon}
          alt="Loading..."
          className="d-block mx-auto my-4"
        />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard key={user._id} user={user}>
              <FollowButton user={user} />
            </UserCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
