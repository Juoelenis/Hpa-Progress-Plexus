import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm]);

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
        Search Results for{" "}
        <span style={{ color: "#FC1503" }}>{searchTerm}</span> videos
      </Typography>
      <Box display="flex">
        {<Videos videos={videos} />}
      </Box>
    </Box>
  );
};

export default SearchFeed;
