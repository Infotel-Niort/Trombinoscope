import { combineReducers } from 'redux'
import authentication from './authReducer'
import collaborateur from './collaborateurReducer'

const rootReducer = combineReducers({
  authentication,
  collaborateur
})

export default rootReducer
