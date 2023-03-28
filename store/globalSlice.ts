import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isMute: true,
  isPlaying: false
};

export const appState = createSlice({
  name: "appState",
  initialState: initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
    playVideo: (state) => {
      state.isPlaying = true;
    },
    pauseVideo: (state) => {
      state.isPlaying = false;
    },
  },
});

export const { startLoading, finishLoading } = appState.actions;

export default appState.reducer;
