import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getDataAPI } from 'utils/fetchData';
import { GLOBALTYPES } from 'redux/actions/globalTypes';
import UserCard from '../UserCard';
import LoadIcon from 'images/loading.gif';

const Search = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(false);

  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;

    try {
      setLoad(true);
      const res = await getDataAPI(
        `search?username=${search}`,
        auth.token
      );
      setUsers(res.data.users);
      setLoad(false);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: error.response.data.msg,
      });
    }
  };

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ''))
        }
        id="search"
      />

      <div
        className="search-form__icon"
        style={{ opacity: search ? 0 : 0.3 }}
      >
        <span className="material-icons">search</span>
        <span>Search</span>
      </div>

      <div
        className="search-form__close"
        style={{ opacity: users.length === 0 ? 0 : 1 }}
        onClick={handleClose}
      >
        &times;
      </div>

      <button type="submit" style={{ display: 'none' }}>
        Search
      </button>

      {load && <img className="loading" src={LoadIcon} alt="Loading..." />}

      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;
