import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import searchSliceReducer from "../features/Search/searchSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        search: searchSliceReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
