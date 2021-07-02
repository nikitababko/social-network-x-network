import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PageRender from './customRouter/PageRender';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Alert, Header, StatusModal } from './components';
import { refreshToken } from './redux/actions/authAction';
import PrivateRouter from 'customRouter/PrivateRouter';
import { getPosts } from 'redux/actions/postAction';

const App = () => {
  const { auth, status } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) dispatch(getPosts(auth.token));
  }, [dispatch, auth.token]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}

          <Route exact path="/" component={auth.token ? Home : Login} />

          <Route
            exact
            path="/register"
            component={auth.token ? Home : Register}
          />

          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
};

export default App;
