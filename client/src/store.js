import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";
import categoriesReducer from "./reducers/categories";
import userReducer from "./reducers/user";
import productsReducer from "./reducers/products";

const middleware = [thunkMiddleware, thunk];

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    user: userReducer,
    products: productsReducer,
  },
  middleware,
});

export default store;
