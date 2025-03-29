import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  movie: null,
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    loadMovie: (state, action) => {
      state.movie = action.payload;
    },
    removeMovie: (state) => {
      state.movie = null;
    },
  },
});

export const { loadMovie, removeMovie } = movieSlice.actions;
export default movieSlice.reducer;
