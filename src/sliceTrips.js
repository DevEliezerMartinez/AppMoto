import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: null,
};

export const routeTrips = createSlice({
  name: "routeTrips", 
  initialState,
  reducers: {
    updateroute2: (state, action) => {
        
        state.counter = action.payload;
      },
     
  },
});

export const { updateroute2 } = routeTrips.actions; // Corregí los nombres de las acciones

export default routeTrips.reducer;
