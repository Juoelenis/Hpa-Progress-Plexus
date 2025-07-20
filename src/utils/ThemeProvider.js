import React, { useEffect, useState } from "react";
import { createTheme, IconButton, ThemeProvider } from "@mui/material";
import { backgroundImg } from "./../utils/constants";
import { Brightness4, Brightness7 } from "@mui/icons-material";

const ThemeProviderWrapper = ({ children }) => {
  const [themeMode, setThemeMode] = useState("light");

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setThemeMode(prefersDarkMode ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newThemeMode = themeMode === "light" ? "dark" : "light";
    setThemeMode(newThemeMode);
  };

  // Create light and dark themes
  const lightTheme = createTheme({
    // Define light theme properties
    palette: {
      mode: "light",
      // Customize other theme properties
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            color: "black",
          },
        },
      },
    },
  });

  const darkTheme = createTheme({
    // Define dark theme properties
    palette: {
      mode: "dark",
      // Customize other theme properties
    },
  });

  // Select the active theme based on the theme mode
  const activeTheme = themeMode === "light" ? lightTheme : darkTheme;

  // Set background style based on theme mode
  const backgroundStyle = {
    background: themeMode === "light" ? `url(${backgroundImg})` : "black",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "repeat-y",
    backgroundAttachment: "fixed",
  };

  return (
    <ThemeProvider theme={activeTheme}>
      <div style={backgroundStyle}>
        {children}
        <IconButton
          color="inherit"
          style={{
            position: "absolute",
            top: "15%",
            right: "10%",
            background: "red",
          }}
          onClick={toggleTheme}
        >
          {themeMode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </div>
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
