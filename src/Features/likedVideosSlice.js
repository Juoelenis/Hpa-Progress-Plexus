import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedVideos: [],
};

export const likedVideosSlice = createSlice({
  name: "likedVideosSlice",
  initialState,
  reducers: {
    addLikedVideos: (state, action) => {
      state.likedVideos.push(action.payload);
    },
    removeLikedVideos: (state, action) => {
      let filterdLikedVideos = state.likedVideos.filter(
        (item) => item.id.videoId !== action.payload.id.videoId
      );
      return { ...state, likedVideos: [...filterdLikedVideos] };
    },
  },
});

export const { addLikedVideos, removeLikedVideos } = likedVideosSlice.actions;

export default likedVideosSlice.reducer;
