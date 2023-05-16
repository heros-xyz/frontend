import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "@/api/user";
import { athleteApi } from "@/api/athlete";
import { fanApi } from "@/api/fan";
import { globalApi } from "@/api/global";
import { adminApi } from "@/api/admin";
import globalSlice from "./globalSlice";

export const store = configureStore({
  reducer: {
    appState: globalSlice,
    [userApi.reducerPath]: userApi.reducer,
    [athleteApi.reducerPath]: athleteApi.reducer,
    [fanApi.reducerPath]: fanApi.reducer,
    [globalApi.reducerPath]: globalApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  devTools: true,
  middleware: (gDM) => {
    return gDM().concat(
      userApi.middleware,
      athleteApi.middleware,
      fanApi.middleware,
      globalApi.middleware,
      adminApi.middleware
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
