import React, { useEffect, useState } from "react";
import "./Navbar.css";
import {
  Drawer,
  Grid,
  List,
  ListItem,
  Typography,
  Box,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Divider } from "@mui/material";

import logo from "../../assets/logo_2.png";
import { HashLink as Link } from "react-router-hash-link";
import DrawerComponent from "./DrawerComponent";

const Navbar = ({ user, setUser }) => {
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      if (position > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Box>
      {isMobile ? (
        <DrawerComponent scrolled={scrolled}  user={user} handleLogout={handleLogout}/>
      ) : (
        <Grid
          className={`${!scrolled && "not-scrolled"} navbar-outer-container`}
        >
          <Grid className="navbar-container">
            <Link to="/#top">
              <Grid className="logo-container" flex>
                <img src={logo} alt="logo" />
              </Grid>
            </Link>

            <Grid sx={{ flexGrow: 1 }} />
            {user != null && (
              <List className="nav-section">
                <Link to="/#top">
                  <ListItem>Home</ListItem>
                </Link>
                <Link to="/#recipes">
                  <ListItem>Recipes</ListItem>
                </Link>
                <Link to="/#create">
                  <ListItem>Add Recipe</ListItem>
                </Link>
                <Link to="/my-recipes#recipes">
                  <ListItem>My Recipes</ListItem>
                </Link>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: "rgba(3,2,2,.2)!important" }}
                />
              </List>
            )}
            {user == null ? (
              <List className="nav-section">
                <Link to="/register">
                  <ListItem>Register</ListItem>
                </Link>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ backgroundColor: "rgba(3,2,2,.2)!important" }}
                />
                <Link to="/login">
                  <Typography
                    className="contact blue-button"
                    sx={{ ml: 4, mt: "0 !important" }}
                  >
                    Login
                  </Typography>
                </Link>
              </List>
            ) : (
              <Link to="/login" onClick={handleLogout}>
                <Typography
                  className="contact blue-button"
                  sx={{ ml: 4, mt: "0 !important" }}
                >
                  Logout
                </Typography>
              </Link>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Navbar;
