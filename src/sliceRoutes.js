import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: null,
};

export const routeMatch = createSlice({
  name: "routeMatch", 
  initialState,
  reducers: {
    updateroute: (state, action) => {
        
        state.counter = action.payload;
      },
     
  },
});

export const { updateroute } = routeMatch.actions; // Corregí los nombres de las acciones

export default routeMatch.reducer;
