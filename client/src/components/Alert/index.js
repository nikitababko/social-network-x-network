import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GLOBALTYPES } from 'redux/actions/globalTypes';
import { Loading, Toast } from 'components';

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    if (alert) {
      setIsAlert(true);
    }
    setTimeout(() => {
      setIsAlert(false);
    }, 3000);
  }, [alert]);

  return (
    <div>
      {/* Loading */}
      {alert.loading && <Loading />}

      {/* Error */}
      {isAlert && alert.error && (
        <Toast
          message={{
            title: 'Error',
            body: alert.error,
          }}
          handleShow={() =>
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: {},
            })
          }
          bgColor="bg-danger"
        />
      )}

      {/* Success */}
      {isAlert && alert.success && (
        <Toast
          message={{
            title: 'Success',
            body: alert.success,
          }}
          handleShow={() =>
            dispatch({
              type: GLOBALTYPES.ALERT,
              payload: {},
            })
          }
          bgColor="bg-success"
        />
      )}
    </div>
  );
};

export default Alert;
