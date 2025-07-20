import { combineReducers } from "@reduxjs/toolkit";
import { watchLaterSlice } from "./../Features/watchLaterSlice";
import { likedVideosSlice } from "./../Features/likedVideosSlice";
import { watchHistorySlice } from "../Features/watchHistorySlice";

export const rootReducer = combineReducers({
  watchLaterSlice: watchLaterSlice.reducer,
  LikedVideosSlice: likedVideosSlice.reducer,
  watchHistorySlice: watchHistorySlice.reducer,
});
