import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/user/userSlice';
import brandReducer from '../needed/brand/brandSlice';
import pCategoryReducer from "../needed/pcategory/pcategorySlice";
import uploadReducer from "../needed/upload/uploadSlice";
import productReducer from "../needed/product/productSlice";
import contactReducer from "../features/contact/contactSlice";
import bannerReducer from "../needed/banner/bannerSlice";
import newsReducer from "../needed/news/newsSlice";
import solutionsReducer from "../needed/solutions/solutionsSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    counter: counterReducer,
    brand: brandReducer,
    pCategory: pCategoryReducer,
    upload: uploadReducer,
    product: productReducer,
    contact: contactReducer,
    banner: bannerReducer,
    news: newsReducer,
    solutions: solutionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});
