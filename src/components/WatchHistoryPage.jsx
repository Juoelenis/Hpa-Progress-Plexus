import { Box, Button, Typography } from "@mui/material";
import { clearWatchHistory } from "../Features/watchHistorySlice";
import { useDispatch, useSelector } from "react-redux";
import { Videos } from "./";

const WatchHistoryPage = () => {
  const watchHistoryData = useSelector(
    (state) => state.watchHistorySlice.watchHistoryVideos
  );
  const dispatch = useDispatch();
  // console.log(watchHistoryData);
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
        <span style={{ color: "#FC1503" }}>Watch</span> History
      </Typography>
      //{" "}
      <Button onClick={() => dispatch(clearWatchHistory())}>Clear All</Button>
      <Box display="flex">
        {watchHistoryData.length > 0 && <Videos videos={watchHistoryData} />}
      </Box>
    </Box>
  );
};

export default WatchHistoryPage;
