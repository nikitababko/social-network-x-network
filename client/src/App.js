import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';

import PageRender from './customRouter/PageRender';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Alert, Header, StatusModal } from './components';
import { refreshToken } from './redux/actions/authAction';
import PrivateRouter from 'customRouter/PrivateRouter';
import { getPosts } from 'redux/actions/postAction';
import { getSuggestions } from 'redux/actions/suggestionsAction';
import { GLOBALTYPES } from 'redux/actions/globalTypes';
import SocketClient from 'SocketClient';
import { getNotifies } from 'redux/actions/notifyAction';

const App = () => {
  const { auth, status, modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    const socket = io();
    dispatch({
      type: GLOBALTYPES.SOCKET,
      payload: socket,
    });

    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}

          <Route exact path="/" component={auth.token ? Home : Login} />

          <Route
            exact
            path="/register"
            component={auth.token ? Home : Register}
          />

          <div className="wrap_page">
            <PrivateRouter exact path="/:page" component={PageRender} />
            <PrivateRouter
              exact
              path="/:page/:id"
              component={PageRender}
            />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
