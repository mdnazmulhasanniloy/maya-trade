import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const selectedProduct = state.carts.find(
        (product) => product._id === action.payload._id
      );
      if (!selectedProduct) {
        const product = { ...action?.payload, quantity: 1 };
        state?.carts?.push(product);
      } else {
        selectedProduct.quantity += 1;
        state?.carts
          ?.filter((product) => product?._id === selectedProduct?._id)
          ?.push(selectedProduct);
      }
    },

    removeFromCart: (state, action) => {
      const selectedProduct = state?.carts?.find(
        (product) => product?._id === action?.payload?._id
      );

      if (selectedProduct) {
        state.carts = state.carts.filter(
          (product) => product?._id !== action?.payload?._id
        );
      }
    },

    quantityMinus: (state, action) => {
      const selectedProduct = state?.carts?.find(
        (product) => product?._id === action?.payload?._id
      );

      if (selectedProduct?.quantity > 1) {
        selectedProduct.quantity -= 1;
      }
    },

    setCartFormLocalStorage: (state, action) => {
      state.carts = action?.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  quantityMinus,
  setCartFormLocalStorage,
} = cartSlice?.actions;

const cartReducer = cartSlice?.reducer;

export default cartReducer;
