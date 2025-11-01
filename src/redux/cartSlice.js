import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { quantity, food } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.food._id === food._id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({ quantity, food });
      }
    },
    removeFromCart: (state, action) => {
      const foodIdToRemove = action.payload._id;
      state.cart = state.cart.filter(
        (item) => item.food._id !== foodIdToRemove
      );
    },
    emptyCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
