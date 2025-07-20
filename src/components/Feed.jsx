import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import {
  HistoryOutlined,
  PlaylistPlayOutlined,
  ThumbUpAltOutlined,
  VisibilityOutlined,
  WatchLaterOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Kids");
  const [videos, setVideos] = useState(null);

  const navigate = useNavigate();
  const cachedVideos = useMemo(() => {
    return { [selectedCategory]: videos };
  }, [selectedCategory, videos]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedCategory, cachedVideos]);

  return (
    <Stack
      display="flex"
      flexDirection="row"
      // justifyContent="center"
      sx={{ flexDirection: "row" }}
    >
      <Box
        width="15%" // Adjust the width as needed
        borderRight="1px solid #3d3d3d"
        p={2}
        sx={{ backgroundColor: "#000", color: "blue" }} // Set the background color
      >
        <List component="nav">
          <ListItem
            button
            selected={selectedCategory === "Watch Later"}
            onClick={() => navigate("/watchlater")}
          >
            <ListItemIcon>
              <WatchLaterOutlined />
            </ListItemIcon>
            <ListItemText primary="Watch Later" />
          </ListItem>
          <ListItem
            button
            selected={selectedCategory === "Liked Videos"}
            onClick={() => navigate("/likedvideos")}
          >
            <ListItemIcon>
              <ThumbUpAltOutlined />
            </ListItemIcon>
            <ListItemText primary="Liked Videos" />
          </ListItem>
          <ListItem
            button
            selected={selectedCategory === "Playlists"}
            onClick={() => navigate("/")}
          >
            <ListItemIcon>
              <PlaylistPlayOutlined />
            </ListItemIcon>
            <ListItemText primary="Playlists" />
          </ListItem>
          <ListItem
            button
            selected={selectedCategory === "Most Viewed"}
            onClick={() => navigate("/")}
          >
            <ListItemIcon>
              <VisibilityOutlined />
            </ListItemIcon>
            <ListItemText primary="Most Viewed" />
          </ListItem>
          <ListItem button onClick={() => navigate("/WatchHistoryPage")}>
            <ListItemIcon>
              <HistoryOutlined />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItem>
        </List>
      </Box>
      <Stack
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="100%"
        sx={{ flexDirection: "column" }}
      >
        <Box
          display="flex"
          justifyContent="center"
          sx={{
            height: { sx: "auto", md: "auto" },
            borderRight: "1px solid #3d3d3d",
            px: { sx: 0, md: 2 },
          }}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </Box>

        <Box
          p={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ overflowY: "auto", height: "90vh", flex: 2 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{ color: "blue" }}
          >
            {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
          </Typography>

          <Videos videos={videos} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Feed;
