import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const hydrate = createAction(HYDRATE);
console.log("eeeeeeee", hydrate.type);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    signIn: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [hydrate.type]: (state, action) => {
      console.log(action.payload.user);
      const {payload: {user: {user: userToSet}}} = action;
      state.user = userToSet;
    },
  },
});

export const userSelector = (state) => state.user;

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
