import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

export const IDperfil = createSlice({
  name: "servicesList", // Cambié el nombre del slice a "userList" para mayor claridad
  initialState,
  reducers: {
    update: (state, action) => {
        // Si action.payload es un valor booleano, asigna ese valor directamente
        // De lo contrario, invierte el valor actual de state.counter
        state.counter = action.payload;
      },
      deletee: (state) => {
        state.counter = null;
      },
  },
});

export const { update, deletee } = IDperfil.actions; // Corregí los nombres de las acciones

export default IDperfil.reducer;
