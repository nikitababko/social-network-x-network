import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PageRender from './customRouter/PageRender';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Alert, Header } from './components';
import { refreshToken } from './redux/actions/authAction';
import PrivateRouter from 'customRouter/PrivateRouter';

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}

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
