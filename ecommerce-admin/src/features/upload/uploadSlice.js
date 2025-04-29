import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImg = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImg(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadDownloadables = createAsyncThunk(
  "upload/downloadables",
  async (data, thunkAPI) => {
    try {
      console.log('Uploading downloadables:', data);
      const formData = new FormData();
      data.forEach(file => {
        formData.append('downloadables', file);
      });
      
      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log('FormData entry:', pair[0], pair[1]);
      }
      
      const response = await uploadService.uploadDownloadables(formData);
      console.log('Upload response:', response);
      return response;
    } catch (error) {
      console.error('Upload error:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delImg = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      await uploadService.deleteImg(id.id);
      return id.images.filter(i => i.public_id!==id.id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const delDownloadables = createAsyncThunk(
  "delete/downloadables",
  async (id, thunkAPI) => {
    try {
      await uploadService.deleteImg(id.id);
      return id.downloadables.filter(i => i.public_id!==id.id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loadImg = createAsyncThunk(
  "load/images",
  async (data, thunkAPI) => {
    try {
      await (async () => {
        return; 
      })();
      return data!==undefined ? data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const loadDownloadables = createAsyncThunk(
  "load/downloadables",
  async (data, thunkAPI) => {
    try {
      await (async () => {
        return; 
      })();
      return data!==undefined ? data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetImg = createAction("Reset_all");

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images.push(action.payload[0]);
      })
      .addCase(uploadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(uploadDownloadables.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadDownloadables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.downloadables.push(action.payload[0]);
      })
      .addCase(uploadDownloadables.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(delImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(delDownloadables.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delDownloadables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.downloadables = action.payload;
      })
      .addCase(delDownloadables.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(loadImg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadImg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(loadImg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(loadDownloadables.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadDownloadables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.downloadables = action.payload;
      })
      .addCase(loadDownloadables.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = "Something went wrong";
      })
      .addCase(resetImg, () => initialState);
  },
});
export default uploadSlice.reducer;
