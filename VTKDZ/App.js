import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import {
  ChannelDetail,
  VideoDetail,
  SearchFeed,
  Navbar,
  Feed,
  LoginPage,
  Signup,
  UserProfile,
  WatchLater,
  LikedVideos,
  WatchHistoryPage,
} from "./components";
import { AuthProvider } from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Box>
          <Navbar />
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route
              exact
              path="/"
              element={<ProtectedRoute path="/" element={<Feed />} />}
            />
            <Route path="/video/:id" element={<VideoDetail />} />
            <Route path="/channel/:id" element={<ChannelDetail />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="/search/:searchTerm" element={<SearchFeed />} />
            <Route path="/likedvideos" element={<LikedVideos />} />
            <Route path="/watchlater" element={<WatchLater />} />
            <Route path="/WatchHistoryPage" element={<WatchHistoryPage />} />
          </Routes>
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
