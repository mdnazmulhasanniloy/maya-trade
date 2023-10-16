import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  isError: false,
  error: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: {},
});

export const {} = productSlice?.actions;

const productsReducer = productSlice?.reducer;
export default productsReducer;
