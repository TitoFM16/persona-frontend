import { createSlice } from "@reduxjs/toolkit";


const personaSlice = createSlice({
  name: 'personas',
  initialState: {
    personas: [],
    loading: false,
    viewDialog: { open: false, persona: {} },
    editDialog: { open: false, persona: {} },
    deleteDialog: { open: false, persona: {} }
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
    },
    openViewDialog: (state, action) => {
      state.viewDialog.open = true;
      state.viewDialog.persona = action.payload;
    },
    closeViewDialog: state => {
        state.viewDialog.open = false;
    },
    openEditDialog: (state, action) => {
        state.editDialog.open = true;
        state.editDialog.persona = action.payload;
    },
    closeEditDialog: state => {
        state.editDialog.open = false;
    },
    openDeleteDialog: (state, action) => {
        state.deleteDialog.open = true;
        state.deleteDialog.persona = action.payload;
    },
    closeDeleteDialog: state => {
        state.deleteDialog.open = false;
    },
  },
});
export const { 
            fetchPersonasStart, fetchPersonasSuccess,
            addPersonaStart   , addPersonaSuccess,
            updatePersonaStart, updatePersonaSuccess,
            deletePersonaStart, deletePersonaSuccess,
            openViewDialog    , closeViewDialog,
            openEditDialog    , closeEditDialog,
            openDeleteDialog  , closeDeleteDialog
               } = personaSlice.actions;

export default personaSlice.reducer;
