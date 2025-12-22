import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authService";
import { postApi } from "./services/postService";
import { searchApi } from "./services/searchService";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(postApi.middleware)
      .concat(searchApi.middleware),
});
