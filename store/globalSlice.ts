import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: false,
  isLoading: false,
};

export const appState = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    setData: (state, action) => {
      state.test = action.payload;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setData, startLoading, finishLoading } = appState.actions;

export default appState.reducer;
