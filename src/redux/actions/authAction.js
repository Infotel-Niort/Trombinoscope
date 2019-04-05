import * as types from '../constants/AuthConstants';
import axios from '../../helpers/axios';
import history from '../../helpers/history';

export const getUser = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'));
  dispatch({ type: types.GET_USER, payload: user });
}

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post('/auth/login', { email, password });
    localStorage.setItem('user', data.user);
    dispatch({ type: types.LOGIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE, payload: err.message });
  }
}

export const register = (email, password, username) => async (dispatch) => {
  try {
    await axios.post('/auth/register', { email, password, username });
    dispatch({ type: types.REGISTER_SUCCESS });
    history.push('/login', { register: 'success' });
  } catch (err) {
    dispatch({ type: types.REGISTER_FAILURE, payload: err.message });
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
