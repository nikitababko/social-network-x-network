import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';
import Menu from './Menu';
import Search from './Search';

const Header = () => {
  const handleScroll = () => {
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="header bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <Link to="/" className="logo">
          <h1
            className="navbar-brand text-uppercase p-0 m-0"
            onClick={handleScroll}
          >
            X-Network
          </h1>
        </Link>

        <Search />

        <Menu />
      </nav>
    </div>
  );
};

export default Header;
