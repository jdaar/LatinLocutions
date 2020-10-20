import { combineReducers, createStore } from "redux";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TStateLocution, ILocution } from "./types";

const initialState: TStateLocution = [];

const locutions = createSlice({
  name: "locutions",
  initialState,
  reducers: {
    addLocution: (state, action: PayloadAction<ILocution>) =>
      !state.find((v) => v.locution === action.payload.locution)
        ? [...state, { ...action.payload }]
        : state,
    favLocution: (state, action: PayloadAction<String>) =>
      state.map((v) =>
        v.locution === action.payload ? { ...v, fav: !v.fav } : v
      ),
  },
});

export const { addLocution, favLocution } = locutions.actions;

export const store = createStore(
  combineReducers({
    locutions: locutions.reducer,
  })
);

store.subscribe(() => {
  store.getState();
});

export type RootState = ReturnType<typeof store.getState>;
