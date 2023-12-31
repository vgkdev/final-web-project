import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  products: [],
  error: null,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    setProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProductStart, setProductSuccess, setProductFailure } =
  productsSlice.actions;

export const setProducts = (data) => async (dispatch) => {
  try {
    dispatch(setProductStart());
    dispatch(setProductSuccess(data));
  } catch (error) {
    dispatch(setProductFailure(error.message));
  }
};

export default productsSlice.reducer;
