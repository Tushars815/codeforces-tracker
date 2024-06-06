import { configureStore } from "@reduxjs/toolkit";
import FetchedDataReducer from "./slices/FetchedDataSlice";

const store = configureStore({
  reducer: {
    fetchData: FetchedDataReducer,
  },
});

export default store;
