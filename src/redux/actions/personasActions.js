import { 
          fetchPersonasStart, fetchPersonasSuccess,
          addPersonaStart   , addPersonaSuccess,
          updatePersonaStart, updatePersonaSuccess,
          deletePersonaStart, deletePersonaSuccess
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
    console.log(error)
  }
  // axios
  //   .get(baseUrl+'api/personas/')
  //   .then((response) => response.data)
  //   .then((personas) => dispatch(fetchPersonasSuccess(personas)));
};

export const createPersona = (persona) => async (dispatch) => {
  dispatch(addPersonaStart());
  axios
    .post(baseUrl+'api/personas/', persona)
    .then((response) => response.data)
    .then((persona) => dispatch(addPersonaSuccess(persona)));
};

export const updatePersona = (persona,id) => (dispatch) => {
  dispatch(updatePersonaStart());
  
  axios
    .put(baseUrl+`api/personas/${id}/`, persona)
    .then((response) => response.data)
    .then((persona) => dispatch(updatePersonaSuccess(persona)));
};

export const deletePersona = (personaId) => (dispatch) => {
  dispatch(deletePersonaStart());
  axios
    .delete(baseUrl+`api/personas/${personaId}/`)
    .then((response) => response.data)
    .then((persona) => dispatch(deletePersonaSuccess(persona)));
};
