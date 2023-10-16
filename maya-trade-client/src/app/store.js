import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/authSlice/authSlice";
import apiSlice from "../features/Api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, logger),
  // middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger),
});
