import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import bannerService from "./bannerService";

export const getAllBanners = createAsyncThunk(
  "banner/get-banners",
  async (thunkAPI) => {
    try {
      console.log("getAllBanners");
      return await bannerService.getBanners();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getBanner = createAsyncThunk(
  "banner/get-banner",
  async (id, thunkAPI) => {
    try {
      return await bannerService.getBanner(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  banners: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const bannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBanners.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBanners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.banners = action.payload;
      })
      .addCase(getAllBanners.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getBanner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.bannerData = action.payload;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default bannerSlice.reducer; 