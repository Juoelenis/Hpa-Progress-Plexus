import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchHistoryVideos: [],
};

export const watchHistorySlice = createSlice({
  name: "watchHistorySlice",
  initialState,
  reducers: {
    addTowatchHistory: (state, action) => {
      state.watchHistoryVideos.push(action.payload);
    },
    clearWatchHistory: (state) => {
      state.watchHistoryVideos = [];
    },
  },
});

export const { addTowatchHistory, clearWatchHistory } =
  watchHistorySlice.actions;

export default watchHistorySlice.reducer;
