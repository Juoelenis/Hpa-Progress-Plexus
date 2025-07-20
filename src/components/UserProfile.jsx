import React, { useContext } from "react";
import {
  Typography,
  Box,
  Divider,
  Grid,
  Button,
  useColorScheme,
} from "@mui/material";
import { AuthContext } from "../utils/AuthContext";

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    height: "85vh",
  },
  avatar: {
    marginRight: "16px",
    color: "white",
    fontSize: "2rem",
    border: "1px solid red",
    padding: "15px",
    borderRadius: "50%",
    backgroundColor: "red",
    fontSize: "34px",
  },
  username: {
    fontWeight: "bold",
    color: "white",
  },
};

const UserProfile = () => {
  const { logout, user } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
  };

  return (
    <Grid container justifyContent="center" style={{ background: "#000" }}>
      <Typography variant="h6" style={styles.username}>
        {user ? (
          <span>
            {" "}
            <Typography color="red" variant="h5">
              Welcome
            </Typography>
            {user.email}
          </span>
        ) : (
          <Typography color="red" variant="h5">
            {" "}
            You are not logged In or Create a account for exploring fun kids
            entertainment
          </Typography>
        )}
      </Typography>
      <Grid item xs={12} sm={8}>
        <Box style={styles.root}>
          {user && (
            <>
              <span style={styles.avatar}>
                {user && user.email[0].toUpperCase()}
              </span>
              <Box>
                <Typography variant="h6" style={styles.username}>
                  {user && user.email}
                </Typography>
                <Typography
                  variant="body2"
                  color="red"
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  YouTube Kids User
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            </>
          )}
          <Box>
            {/* Additional user information */}
            {/* ... */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
