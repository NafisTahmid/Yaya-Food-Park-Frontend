import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foods: [],
    food: null,
  },
  reducers: {
    setAllFoods: (state, action) => {
      state.foods = action.payload;
    },
    setFood: (state, action) => {
      state.food = action.payload;
    },
  },
});

export const { setAllFoods, setFood } = foodSlice.actions;
export default foodSlice.reducer;
