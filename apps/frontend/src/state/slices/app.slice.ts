import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReviews } from "@/state/actions/sanity.action";

const APP_SLICE = "APP_SLICE";

interface IState {
  breadcrumb_visibility: "OPEN" | "CLOSE";
}

const initialState: IState = {
  breadcrumb_visibility: "CLOSE"
};

export const appSlice = createSlice({
  name: APP_SLICE,
  initialState,

  reducers: {
    handleBreadcrumbVisibility(state, action: PayloadAction<"OPEN" | "CLOSE">) {
      state.breadcrumb_visibility = action.payload;
    }
  }
});

export const {
  handleBreadcrumbVisibility
} = appSlice.actions;
export default appSlice;