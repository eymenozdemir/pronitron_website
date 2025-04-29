import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import newsService from "./newsService";

export const getAllNews = createAsyncThunk(
  "news/get-news",
  async (thunkAPI) => {
    try {
      return await newsService.getNews();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getNewsById = createAsyncThunk(
  "news/get-news-by-id",
  async (id, thunkAPI) => {
    try {
      return await newsService.getNewsById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  news: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.news = action.payload;
      })
      .addCase(getAllNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getNewsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNewsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.newsData = action.payload;
      })
      .addCase(getNewsById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default newsSlice.reducer; 