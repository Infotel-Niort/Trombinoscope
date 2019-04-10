import {
  IS_LOGGED_FAILURE,
  IS_LOGGED_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
} from '../constants/authConstants'

const isLogin = !!(localStorage.getItem('user'))
const initialState = isLogin ? { loggedIn: true } : { loggedIn: false }

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case IS_LOGGED_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
      }
    case IS_LOGGED_FAILURE:
      return {
        loggedIn: false,
        user: action.payload,
      }
    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
      }
    case LOGIN_FAILURE:
      return {
        loggedIn: false,
        err: action.payload,
      }
    case REGISTER_SUCCESS:
      return {
        loggedIn: true,
        user: action.payload,
      }
    case REGISTER_FAILURE:
      return {
        loggedIn: false,
        err: action.payload,
      }
    case LOGOUT:
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}
