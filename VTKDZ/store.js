import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "../Reducers/reducer";

export const store = configureStore({
  reducer: rootReducer,
});
