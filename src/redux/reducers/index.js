import { combineReducers } from 'redux'
import authentication from './AuthReducer'

const rootReducer = combineReducers({
  authentication
})

export default rootReducer
