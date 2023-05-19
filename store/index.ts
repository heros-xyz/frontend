import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import globalSlice from "./globalSlice";

export const store = configureStore({
  reducer: {
    appState: globalSlice,

  },
  devTools: true,
  middleware: (gDM) => {
    return gDM().concat(

    );
  },
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

setupListeners(store.dispatch);
