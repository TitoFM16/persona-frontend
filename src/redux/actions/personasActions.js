import { 
          fetchPersonasStart, fetchPersonasSuccess,
          addPersonaStart   , addPersonaSuccess,
          updatePersonaStart, updatePersonaSuccess,
          deletePersonaStart, deletePersonaSuccess
        } from '../slices/personasSlice';
import  personasStatus  from '../slices/statusSlice';

import { baseUrl } from '../../shared/baseUrl';
import axios from 'axios';

export const fetchPersonas = () => async (dispatch) => {
  dispatch(fetchPersonasStart());
  try {
    const response = await axios.get(baseUrl+'api/personas/');
    const personas = await response.data;
    dispatch(fetchPersonasSuccess(personas));
    dispatch(personasStatus('GET','Satisfactorio',personas));
  } catch (error) {
    console.log(error)
    dispatch(personasStatus('GET','Error',error))
  }

};

export const createPersona = (persona) => async (dispatch) => {
  try{
    
    dispatch(addPersonaStart());
    axios
    .post(baseUrl+'api/personas/', persona)
    .then((response) => response.data)
    .then((persona) => dispatch(addPersonaSuccess(persona)),
    dispatch(personasStatus('POST','Satisfactorio',persona)));
  }catch(error){
    console.log(error)
    dispatch(personasStatus('POST','Error',error))
  }
};

export const updatePersona = (persona,id) => (dispatch) => {
  try{

    dispatch(updatePersonaStart());
    axios
    .put(baseUrl+`api/personas/${id}/`, persona)
    .then((response) => response.data)
    .then((persona) => dispatch(updatePersonaSuccess(persona)),dispatch(personasStatus('PUT','Satisfactorio',persona)));
  }catch(error){
    console.log(error)
    dispatch(personasStatus('PUT','Error',error))
  }
};

export const deletePersona = (personaId) => (dispatch) => {
  try{

    dispatch(deletePersonaStart());
    axios
    .delete(baseUrl+`api/personas/${personaId}/`)
    .then((response) => response.data)
    .then((persona) => dispatch(deletePersonaSuccess(persona)),dispatch(personasStatus('DELETE','Satisfactorio')));
  }catch(error){
    console.log(error)
    dispatch(personasStatus('DELETE','Error',error))
  }
};
