import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './state/store';
import App from './App.tsx';
import Diamond from './Diamond.tsx';
import Login from './Login.jsx';
import './index.css';

// Simple auth check function
const isAuthenticated = () => {
  return sessionStorage.getItem('isAuthenticated') === 'true';
};

// Protected route component
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={App} />
          <ProtectedRoute path="/diamond/:tableNo" component={Diamond} />
          <ProtectedRoute path="/manager" component={App} />
          <Redirect to="/login" />
        </Switch>
      </Router>
    </Provider>
  </StrictMode>
);