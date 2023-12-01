// src/slices/miSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  miObjeto: {
    marca: '',
    modelo: '',
    año: '',
    ruta: '',
  },
};

const miSlice = createSlice({
  name: 'miSlice',
  initialState,
  reducers: {
    actualizarMarca: (state, action) => {
      state.miObjeto.marca = action.payload;
    },
    actualizarModelo: (state, action) => {
      state.miObjeto.modelo = action.payload;
    },
    actualizarAño: (state, action) => {
      state.miObjeto.año = action.payload;
    },
    actualizarRuta: (state, action) => {
      state.miObjeto.ruta = action.payload;
    },
    actualizarID: (state, action) => {
      state.miObjeto.ID = action.payload;
    },
  },
});

export const {
  actualizarMarca,
  actualizarModelo,
  actualizarAño,
  actualizarRuta,
  actualizarID
} = miSlice.actions;

export default miSlice.reducer;
