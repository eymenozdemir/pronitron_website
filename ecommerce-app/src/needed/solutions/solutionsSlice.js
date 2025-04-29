import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import solutionsService from "./solutionsService";

export const getAllSolutions = createAsyncThunk(
  "solutions/get-solutions",
  async (thunkAPI) => {
    try {
      return await solutionsService.getSolutions();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSolutionById = createAsyncThunk(
  "solutions/get-solution-by-id",
  async (id, thunkAPI) => {
    try {
      return await solutionsService.getSolutionById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  solutions: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const solutionsSlice = createSlice({
  name: "solutions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSolutions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllSolutions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.solutions = action.payload;
      })
      .addCase(getAllSolutions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getSolutionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSolutionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.solutionData = action.payload;
      })
      .addCase(getSolutionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default solutionsSlice.reducer; 