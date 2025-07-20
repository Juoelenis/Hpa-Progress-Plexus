import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Videos } from "./";

const WatchLater = () => {
  const watchLaterVideosData = useSelector(
    (state) => state.watchLaterSlice.watchLater
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
        <span style={{ color: "#FC1503" }}>WatchLater</span> videos
      </Typography>
      <Box display="flex">
        {watchLaterVideosData.length > 0 && (
          <Videos videos={watchLaterVideosData} />
        )}
      </Box>
    </Box>
  );
};

export default WatchLater;
