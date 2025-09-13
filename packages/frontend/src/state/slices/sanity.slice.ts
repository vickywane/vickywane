import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { HYDRATE } from "next-redux-wrapper";
// import { apiConfig } from "@/config/envApi";
import { fetchReviews } from "@/state/actions/sanity.action";
import { Review } from "@/data/schema";

const SANITY_HOME_SLICE = "SANITY_HOME_SLICE";

interface IState {
  work_review: Review[];
  technical_writing_review: Review[];
}

const initialState: IState = {
  work_review: [],
  technical_writing_review: []
};

export const sanitySlice = createSlice({
  name: SANITY_HOME_SLICE,
  initialState,

  reducers: {},
  // extraReducers: {
  // [HYDRATE]: (state, action) => {
  //   return {
  //     ...state,
  //     ...action.payload.subject
  //   };
  // }
  // }
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchReviews.fulfilled, (state, { payload }) => {
          state[payload.type] = [...payload.data];
        })
      .addCase(fetchReviews.rejected, (state, { payload }) => {
        console.log(payload);
      });
  }
});

export const {} = sanitySlice.actions;
export default sanitySlice;