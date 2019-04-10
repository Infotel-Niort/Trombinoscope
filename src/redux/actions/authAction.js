import * as types from '../constants/authConstants';
import axios from '../../helpers/axios';
import history from '../../helpers/history';

export const isLogged = () => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/islogged');
    localStorage.setItem('user', data.user);
    dispatch({ type: types.IS_LOGGED_SUCCESS, payload: data.user });
  } catch (err) {
    dispatch({ type: types.IS_LOGGED_FAILURE, payload: { code: err.response.status } });
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', { email, password });
    localStorage.setItem('user', data.user);
    dispatch({ type: types.LOGIN_SUCCESS, payload: data.user });
    history.push('/', { register: 'success' });
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE, payload: { code: err.response.status, message: err.response.data.message } });
  }
}

export const register = (email, password, firstname, lastname) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/register', { email, password, firstname, lastname });
    dispatch({ type: types.REGISTER_SUCCESS, payload: data.user });
    history.push('/', { register: 'success' });
  } catch (err) {
    dispatch({ type: types.REGISTER_FAILURE, payload: { code: err.response.status, message: err.response.data.message } });
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout');
    localStorage.removeItem('user');
    dispatch({ type: types.LOGOUT });
    history.push('/login');
  } catch (err) {
    console.log(err);
  }
}
