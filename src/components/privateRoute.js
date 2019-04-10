import React from 'react';
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route {...rest} render={props => {
    return (
      loggedIn
      ? <Component {...props} />
      : <Redirect to="/login" />
    )
  }}/>
);

const mapStateToProps = state => ({ loggedIn: state.authentication.loggedIn });
export default connect(mapStateToProps, null, null, { pure: false })(PrivateRoute);
