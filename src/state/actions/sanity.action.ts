import { createAsyncThunk } from "@reduxjs/toolkit"
import { SanityClient } from "@/utils/Sanity"
import { REVIEWS_QUERY } from "@/data/gqols"
import { Review } from "@/data/schema"

export const SANITY_HOME_ACTION: string = "SANITY_HOME_ACTION"

export const fetchHomeData = createAsyncThunk(SANITY_HOME_ACTION, () => {})

interface FetchReview {
  data: Review[]
  type: "work_review" | "technical_writing_review"
}

export const fetchReviews = createAsyncThunk(
  SANITY_HOME_ACTION,
  async (type: FetchReview["type"]) => {
    const data = await SanityClient().fetch(REVIEWS_QUERY(type))

    return  { data, type }
  }
)

// export const fetchUserById = createAsyncThunk<FetchReview, string>(
//   'users/fetchByIdStatus',
//   async (type: string, thunkAPI) => {
//     const response =  await SanityClient().fetch(REVIEWS_QUERY(type))

//     return {}
//   }
// )

//   export const fetchReviews = createAsyncThunk<
//   { data: Review[]; type: "work_review" | "technical_writing_review" },
//   string
// >(SANITY_HOME_ACTION, async type => {
//   const data = await SanityClient().fetch(REVIEWS_QUERY(type))

//   return { data, type }
// })
