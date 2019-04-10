import {
  GET_ALL_COLLABORATEUR,
  GET_ONE_COLLABORATEUR,
  ADD_COLLABORATEUR,
  EDIT_COLLABORATEUR,
  REMOVE_COLLABORATEUR
} from '../constants/collaborateurConstants'

const initialState = { collaborateurs: [] };

export default function collaborateur(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COLLABORATEUR:
      return {
        collaborateurs: action.payload
      }
    case GET_ONE_COLLABORATEUR:
      return {
        ...state,
        collaborateur: action.payload
      }
    case ADD_COLLABORATEUR:
      return {
        collaborateurs: [...state.collaborateurs, action.payload.collaborateur]
      }
    default:
      return state
  }
}
