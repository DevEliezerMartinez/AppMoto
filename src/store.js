// store.js
import { configureStore } from '@reduxjs/toolkit';
import miReducer from './slice';
import listServices from './sliceServices';
import IDlist from './sliceID';
import routeMatch from './sliceTrips';
import routeTrip from './sliceRoutes';
import infoProfile from './sliceInfoProfile';

const store = configureStore({
  reducer: {
    miDato: miReducer,
    listServices: listServices,
    IDlist: IDlist,
    routeMatch: routeMatch,
    routeTrip: routeTrip,
    infoProfile: infoProfile,
  },
});

export default store;
