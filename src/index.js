import React from 'react'
import ReactDOM from 'react-dom'
import 'semantic-ui-css/semantic.min.css'

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './redux/reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

import { Route, Router, Switch } from 'react-router-dom'
import history from './helpers/history'
import PrivateRoute from './components/privateRoute'

import Collaborateurs from './views/Collaborateurs'
import Login from './views/Login'
import Register from './views/Register'

const root = (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path="/" component={Collaborateurs}/>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
