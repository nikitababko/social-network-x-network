import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GLOBALTYPES } from 'redux/actions/globalTypes';

import './index.scss';

const StatusModal = () => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

  const [stream, setStream] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  const [track, setTrack] = useState('');

  const handleClose = () => {
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };

  const handleChangeContent = (e) => {
    setContent(e.target.value);
  };

  const handleChangeInput = (e) => {
    const files = [...e.target.files];
    let error = '';
    let newImages = [];

    files.forEach((file) => {
      if (!file) {
        return (error = 'File does not exist.');
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return (error = 'Image format is incorrect.');
      }

      return newImages.push(file);
    });

    if (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error },
      });
    } else {
      setImages([...images, ...newImages]);
    }
  };

  const handleDeleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleStream = () => {
    setStream(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia()) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
          const track = mediaStream.getTracks();
          setTrack(track[0]);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="status-modal">
      <form>
        <div className="status-modal__header">
          <h5 className="m-0">Create Post</h5>
          <span onClick={handleClose}>&times;</span>
        </div>

        <div className="status-modal__body">
          <textarea
            name="content"
            value={content}
            onChange={handleChangeContent}
            placeholder={`${auth.user.username}, what are you thinking?`}
          ></textarea>

          <div className="show-images">
            {images.map((image, index) => (
              <div key={index} id="file-image">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Image"
                  className="img-thumbnail"
                  style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                />
                <span onClick={handleDeleteImages}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              />

              <span>&times;</span>
              <canvas ref={canvasRef} />
            </div>
          )}

          <div className="input-images">
            <i className="fas fa-camera" onClick={handleStream} />

            <div className="file-upload">
              <i className="fas fa-image" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
                onChange={handleChangeInput}
              />
            </div>
          </div>

          <div className="status-modal__footer">
            <button className="btn btn-secondary w-100">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
