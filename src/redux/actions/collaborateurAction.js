import * as types from '../constants/collaborateurConstants';
import axios from '../../helpers/axios';
import history from '../../helpers/history';

export const getCollaborateurs = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/collaborateur');
    dispatch({ type: types.GET_ALL_COLLABORATEUR, payload: data.collaborateurs });
  } catch (err) {}
}

export const getCollaborateur = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get('/collaborateur/' + id);
    dispatch({ type: types.GET_ONE_COLLABORATEUR, payload: data.collaborateur });
  } catch (err) {}
}

export const addCollaborateur = (collaborateur) => async (dispatch) => {
  try {
    const { data } = await axios.post('/collaborateur/add', collaborateur);
    dispatch({ type: types.ADD_COLLABORATEUR, payload: { collaborateur, id: data.id } });
  } catch (err) {}
}

export const updateCollaborateur = (collaborateur) => async (dispatch) => {
  try {
    const { data } = await axios.put('/collaborateur/update', collaborateur);
    dispatch({ type: types.EDIT_COLLABORATEUR, payload: { collaborateur, id: data.id } });
  } catch (err) {}
}
