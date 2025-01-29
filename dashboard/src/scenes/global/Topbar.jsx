import { Box, IconButton, useTheme, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonModeOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate(); // Hook to navigate to different pages

  // Function to handle logout
  const handleLogout = () => {
    // Remove token from localStorage to log the user out
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* Search bar */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonModeOutlinedIcon />
        </IconButton>

        {/* Logout button */}
        <Button
          startIcon={<ExitToAppIcon />}
          variant="contained"
          sx={{
            marginLeft: 2,
            textTransform: 'none',
            backgroundColor: '#FF5733', // Default color
            '&:hover': {
              backgroundColor: '#FF7043', // Color on hover
            },
            '&:active': {
              backgroundColor: '#C84B29', // Color when button is clicked
            },
          }}
          onClick={handleLogout} // Trigger logout on click
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;
