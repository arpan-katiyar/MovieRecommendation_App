import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  person: null,
};

export const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    loadPerson: (state, action) => {
      state.person = action.payload;
    },
    removePerson: (state) => {
      state.person = null;
    },
  },
});

export const { loadPerson, removePerson } = personSlice.actions;
export default personSlice.reducer;
