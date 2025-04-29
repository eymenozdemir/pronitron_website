import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import refurbishedService from "./refurbishedService";

export const getRefurbisheds = createAsyncThunk(
  "refurbished/get-refurbisheds",
  async (thunkAPI) => {
    try {
      return await refurbishedService.getRefurbisheds();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getARefurbished = createAsyncThunk(
  "refurbished/get-refurbished",
  async (id, thunkAPI) => {
    try {
      return await refurbishedService.getRefurbished(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  refurbisheds: [],
  refurbished: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const refurbishedSlice = createSlice({
  name: "refurbisheds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRefurbisheds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRefurbisheds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.refurbisheds = action.payload;
      })
      .addCase(getRefurbisheds.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getARefurbished.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getARefurbished.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.refurbishedName = action.payload;
      })
      .addCase(getARefurbished.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default refurbishedSlice.reducer;
