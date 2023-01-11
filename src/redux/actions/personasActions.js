import { 
          fetchPersonasStart, fetchPersonasSuccess,
          addPersonaStart   , addPersonaSuccess,
          updatePersonaStart, updatePersonaSuccess,
          deletePersonaStart, deletePersonaSuccess,
          openViewDialog    , closeViewDialog,
          openEditDialog    , closeEditDialog,
          openDeleteDialog  , closeDeleteDialog
        } from '../slices/personasSlice';
import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios';
import { useDispatch } from 'react-redux'

export const fetchPersonas = () => async (dispatch) => {
  dispatch(fetchPersonasStart());
  try {
    const response = await axios.get(baseUrl+'api/personas/');
    const personas = await response.data;
    dispatch(fetchPersonasSuccess(personas));
  } catch (error) {
    // Handle the error, for example by dispatching an action to show an error message
  }
  // axios
  //   .get(baseUrl+'api/personas/')
  //   .then((response) => response.data)
  //   .then((personas) => dispatch(fetchPersonasSuccess(personas)));
};

export const createPersona = (persona) => (dispatch) => {
  dispatch(addPersonaStart());
  axios
    .post(baseUrl+'api/personas/', persona)
    .then((response) => response.data)
    .then((persona) => dispatch(addPersonaSuccess(persona)));
};

export const updatePersona = (persona) => (dispatch) => {
  dispatch(updatePersonaStart());
  axios
    .patch(baseUrl+`api/personas/${persona.id}`, persona)
    .then((response) => response.data)
    .then((persona) => dispatch(updatePersonaSuccess(persona)));
};

export const deletePersona = (personaId) => (dispatch) => {
  dispatch(deletePersonaStart());
  axios
    .delete(baseUrl+`api/personas/${personaId}`)
    .then((response) => response.data)
    .then((persona) => dispatch(deletePersonaSuccess(persona)));
};

export const handleViewClick = (persona) =>  (dispatch) => {
  dispatch(openViewDialog(persona));
}
export const handleEditClick = (persona) =>  (dispatch) => {
  dispatch(openEditDialog(persona));
}
export const handleDeleteClick = (persona) =>  (dispatch) => {
  dispatch(openDeleteDialog(persona));
}