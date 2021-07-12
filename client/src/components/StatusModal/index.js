import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GLOBALTYPES } from 'redux/actions/globalTypes';
import { createPost, updatePost } from 'redux/actions/postAction';

import './index.scss';

const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
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
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    canvasRef.current.setAttribute('width', width);
    canvasRef.current.setAttribute('height', height);

    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = canvasRef.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopStream = () => {
    track.stop();
    setStream(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Please add your photo.' },
      });
    }

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent('');
    setImages([]);
    if (track) track.stop();
    dispatch({
      type: GLOBALTYPES.STATUS,
      payload: false,
    });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  return (
    <div className="status-modal">
      <form onSubmit={handleSubmit}>
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
                  src={
                    image.camera
                      ? image.camera
                      : image.url
                      ? image.url
                      : URL.createObjectURL(image)
                  }
                  alt="Image"
                  className="img-thumbnail"
                  style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                />
                <span onClick={handleDeleteImages}>&times;</span>
              </div>
            ))}
          </div>

          {stream && (
            <div className="stream position-relative">
              <video
                autoPlay
                muted
                ref={videoRef}
                width="100%"
                height="100%"
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              />

              <span onClick={handleStopStream}>&times;</span>
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          )}

          <div className="input-images">
            {stream ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
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
              </>
            )}
          </div>

          <div className="status-modal__footer">
            <button className="btn btn-secondary w-100" type="submit">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
