import {
  GET_USER,
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
    case GET_USER:
      return {
        loggedIn: true,
        ...action.payload,
      }
    case LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        loader: true,
      }
    case LOGIN_FAILURE:
      return {
        loggedIn: false,
        loginFailed: true,
        err: action.payload,
      }
    case REGISTER_SUCCESS:
      return {
        registed: true,
      }
    case REGISTER_FAILURE:
      return {
        registerFailed: true,
      }
    case LOGOUT:
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}
