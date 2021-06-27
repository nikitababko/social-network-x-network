import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from 'redux/actions/authAction';
import { GLOBALTYPES } from 'redux/actions/globalTypes';
import { Avatar } from 'components';

import './index.scss';

const Header = () => {
  const navLinks = [
    { label: 'Home', icon: 'home', path: '/' },
    { label: 'Message', icon: 'near_me', path: '/message' },
    { label: 'Discover', icon: 'explore', path: '/discover' },
    { label: 'Notify', icon: 'favorite', path: '/notify' },
  ];

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleTheme = () => {
    dispatch({ type: GLOBALTYPES.THEME, payload: !theme });
  };

  const { pathname } = useLocation();
  const isActive = (pn) => {
    if (pn === pathname) return 'active';
  };

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between align-middle">
        <Link to="#">
          <h1 className="navbar-brand text-uppercase p-0 m-0">
            X-Network
          </h1>
        </Link>

        <div className="menu">
          <ul className="navbar-nav flex-row">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item px-2">
                <Link
                  className={`nav-link ${isActive(link.path)}`}
                  to={link.path}
                >
                  <span className="material-icons">{link.icon}</span>
                </Link>
              </li>
            ))}

            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Avatar auth={auth} />
              </span>

              <div
                className="dropdown-menu"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item"
                  to={`/profile/${auth.user._id}`}
                >
                  Profile
                </Link>
                <label
                  className="dropdown-item"
                  htmlFor="theme"
                  onClick={handleTheme}
                >
                  {theme ? 'Light mode' : 'Dark mode'}
                </label>

                <div className="dropdown-divider"></div>
                <Link
                  className="dropdown-item"
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
