import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { logo, kidProfile } from "../utils/constants";
import { SearchBar } from "./";
import { useContext } from "react";
import { AuthContext } from "../utils/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <Stack
      zIndex="2"
      direction="row"
      alignItems="center"
      p={1}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <span color="red">
          <img src={logo} alt="logo" height={55} />
        </span>
      </Link>
      <SearchBar />
      <Link
        to="/userprofile"
        style={{
          border: "1.5px solid red",
          borderRadius: "50%",
          padding: "5px",
        }}
      >
        <span color="red">
          {user ? (
            <Typography
              variant="h6"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontStyle: "bold",
                color: "white",
                padding: "8px",
                height: "25px",
                width: "25px",
              }}
            >
              {user.email[0].toUpperCase()}
            </Typography>
          ) : (
            <img src={kidProfile} alt="kidProfile" height={40} />
          )}
        </span>
      </Link>
    </Stack>
  );
};

export default Navbar;
