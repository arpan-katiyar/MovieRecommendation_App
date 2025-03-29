import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tv: null,
};

export const tvSlice = createSlice({
  name: "tv",
  initialState,
  reducers: {
    loadTv: (state, action) => {
      state.tv = action.payload;
    },
    removeTv: (state) => {
      state.tv = null;
    },
  },
});

export const { loadTv, removeTv } = tvSlice.actions;
export default tvSlice.reducer;
