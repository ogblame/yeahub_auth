import { configureStore } from "@reduxjs/toolkit";
import { baseApi, configureApiAuth } from "../../../shared/api";
import {
  sessionReducer,
  setAccessToken,
  clearSession,
} from "../../../entities/session";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    session: sessionReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

configureApiAuth(
  () => store.getState().session.accessToken,

  (token) => {
    store.dispatch(setAccessToken(token));
  },

  () => {
    store.dispatch(clearSession());
    store.dispatch(baseApi.util.resetApiState());
  },
);

export type RootState = ReturnType<typeof store.getState>;
