import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { checkImage } from 'utils/imageUpload';
import { GLOBALTYPES } from 'redux/actions/globalTypes';

import './EditProfile.scss';

const EditProfile = ({ setOnEdit }) => {
  const initialState = {
    fullname: '',
    mobile: '',
    address: '',
    website: '',
    story: '',
  };
  const [userData, setUserData] = useState(initialState);
  const { fullname, mobile, address, website, story } = userData;

  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();

  const { auth, theme } = useSelector((state) => state);

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const handleClose = () => {
    setOnEdit(false);
  };

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const error = checkImage(file);
    console.log(error);
    if (error) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error },
      });
    }
    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="edit-profile">
      <button
        className="btn btn-danger edit-profile__close"
        onClick={handleClose}
      >
        Close
      </button>

      <form className="edit-profile__form">
        <div className="edit-profile__form-avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="Avatar"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file-up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: '50%',
                right: '5px',
                transform: 'translateY(-50%)',
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <div className="position-relative">
            <input
              type="number"
              className="form-control"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              value={address}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="website">Website</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="website"
              name="website"
              value={website}
              onChange={handleInput}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="story">Story</label>
          <div className="position-relative">
            <textarea
              type="text"
              className="form-control"
              id="story"
              name="story"
              value={story}
              onChange={handleInput}
              cols="30"
              rows="4"
            />

            <small className="text-danger d-block text-right">
              {fullname.length}/200
            </small>
          </div>
        </div>

        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepend px-0 mb-4">
          <select
            name="gender"
            id="gender"
            className="custom-select text-capitalize"
            onChange={handleInput}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button className="btn btn-info w-100" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
