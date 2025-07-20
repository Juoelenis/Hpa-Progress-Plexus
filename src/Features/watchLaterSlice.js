import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watchLater: [],
};
export const watchLaterSlice = createSlice({
  name: "watchLaterSlice",
  initialState,
  reducers: {
    addWatchLaterVideos: (state, action) => {
      state.watchLater.push(action.payload);
    },
    removeWatchLaterVideos: (state, action) => {
      let filterdWatchLaterVideos = state.watchLater.filter(
        (item) => item.id.videoId !== action.payload.id.videoId
      );
      return { ...state, watchLater: [...filterdWatchLaterVideos] };
    },
  },
});

export const { addWatchLaterVideos, removeWatchLaterVideos } =
  watchLaterSlice.actions;

export default watchLaterSlice.reducer;
