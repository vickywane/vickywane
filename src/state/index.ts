import { combineReducers, configureStore, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sanitySlice from "@/state/slices/sanity.slice";
import AppSlice from "@/state/slices/app.slice";

const reducer = combineReducers({
  sanity: sanitySlice.reducer,
  app: AppSlice.reducer
});

export const reduxStore = configureStore({
  reducer,
  devTools: true
});

export type AppState = ReturnType<AppStore["getState"]>;

// RTK Types
export type RootState = ReturnType<typeof reducer>;
// @ts-ignore
export type AppStore = ReturnType<typeof reduxStore>;
export type AppDispatch = AppStore["dispatch"];

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

// export const wrapper = createWrapper<AppStore>(makeStore);
