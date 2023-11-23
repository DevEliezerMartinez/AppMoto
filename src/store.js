// store.js
import { configureStore } from '@reduxjs/toolkit';
import miReducer from './slice';
import listServices from './sliceServices';
import IDlist from './sliceID';

const store = configureStore({
  reducer: {
    miDato: miReducer,
    listServices: listServices,
    IDlist: IDlist,
  },
});

export default store;
