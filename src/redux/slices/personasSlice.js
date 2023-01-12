import { createSlice } from "@reduxjs/toolkit";


const personaSlice = createSlice({
  name: 'personas',
  initialState: {
    personas: [],
    loading: false

  },
  reducers: {
    fetchPersonasStart: (state) => {
      state.loading = true;
    },
    fetchPersonasSuccess: (state, action) => {
      state.personas = action.payload;
      state.loading = false;
    },
    addPersonaStart: (state) => {
      state.loading = true;
    },
    addPersonaSuccess: (state, action) => {
      state.personas.push(action.payload);
      state.loading = false;
    },
    updatePersonaStart: (state) => {
      state.loading = true;
    },
    updatePersonaSuccess: (state, action) => {
      const index = state.personas.findIndex((persona) => persona.id === action.payload.id);
      state.personas[index] = action.payload;
      state.loading = false;
    },
    deletePersonaStart: (state) => {
      state.loading = true;
    },
    deletePersonaSuccess: (state, action) => {
      state.personas = state.personas.filter((persona) => persona.id !== action.payload.id);
      state.loading = false;
    }
  },
});
export const { 
            fetchPersonasStart, fetchPersonasSuccess,
            addPersonaStart   , addPersonaSuccess,
            updatePersonaStart, updatePersonaSuccess,
            deletePersonaStart, deletePersonaSuccess
               } = personaSlice.actions;

export default personaSlice.reducer;
