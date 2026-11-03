import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type SessionState = {
  accessToken: string | null;
};

const initialState: SessionState = {
  accessToken: null,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,

  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },

    clearSession(state) {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearSession } = sessionSlice.actions;
export const sessionReducer = sessionSlice.reducer;
