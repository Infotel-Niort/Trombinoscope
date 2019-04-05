import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './redux/reducers'
const store = createStore(rootReducer)

import { Route, Link, BrowserRouter } from 'react-router-dom';
import App from './views/App';
import Login from './views/Login';

const root = (
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
      </div>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
