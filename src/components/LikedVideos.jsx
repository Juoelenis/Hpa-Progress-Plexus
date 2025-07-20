import { Box, Typography } from "@mui/material";
import React from "react";
import { Videos } from "./";
import { useSelector } from "react-redux";

const LikedVideos = () => {
  const likedVideosData = useSelector(
    (state) => state.LikedVideosSlice.likedVideos
  );

  return (
    <Box
      p={2}
      minHeight="95vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
    >
      <Typography
        variant="h4"
        fontWeight={900}
        color="white"
        mb={3}
        ml={{ sm: "100px" }}
        display="flex"
        justifyContent="center"
      >
        <span style={{ color: "#FC1503" }}>Liked</span> videos
      </Typography>
      <Box display="flex">
        {likedVideosData.length > 0 && <Videos videos={likedVideosData} />}
      </Box>
    </Box>
  );
};

export default LikedVideos;
