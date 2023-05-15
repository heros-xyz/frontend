import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  isLoading: false,
  isMute: true,
  isPlaying: false,
  accessToken: '',
  refreshToken: ''
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
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action.payload.appState.accessToken) {
        state.accessToken = action.payload.appState.accessToken;
      }

      if (action.payload.appState.refreshToken) {
        state.refreshToken = action.payload.appState.refreshToken;
      }
    }
  }
});

export const { startLoading, finishLoading, setAccessToken, setRefreshToken } = appState.actions;

export default appState.reducer;
