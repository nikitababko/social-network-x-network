import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { GLOBALTYPES } from 'redux/actions/globalTypes';
import { Loading, Toast } from 'components';

const Alert = () => {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {/* Loading */}
      {alert.loading && <Loading />}

      {/* Error */}
      {alert.error && (
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
      {alert.success && (
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
