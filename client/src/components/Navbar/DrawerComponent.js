import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { HashLink as Link } from "react-router-hash-link";
import { Menu, Close } from "@mui/icons-material/";
import logo from "../../assets/logo_2.png";

function DrawerComponent({ scrolled, user, handleLogout }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Grid
      className={`${
        !scrolled && "not-scrolled"
      } navbar-outer-container drawer-container`}
    >
      <Grid className="navbar-container">
        <Link to="/#top">
          <Grid className="logo-container" flex>
            <img src={logo} alt="logo" />
          </Grid>
        </Link>
        <Drawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          className="drawer"
        >
          <Link to="/#top">
            <Grid className="logo-container" flex sx={{ mt: 6 }}>
              <img src={logo} alt="logo" />
            </Grid>
          </Link>
          {user != null && (
            <List className="nav-section">
              <Link to="/#top" onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItem>Home</ListItem>
              </Link>
              <Link to="/#recipes" onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItem>Recipes</ListItem>
              </Link>
              <Link to="/#create" onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItem>Add Recipe</ListItem>
              </Link>
              <Link
                to="/my-recipes#recipes"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <ListItem>My Recipes</ListItem>
              </Link>
            </List>
          )}
          {user == null ? (
            <List className="nav-section">
              <Link to="/register" onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItem>Register</ListItem>
              </Link>
              <Divider
                orientation="vertical"
                flexItem
                sx={{ backgroundColor: "rgba(3,2,2,.2)!important" }}
              />
              <Link
                to="/login"
                className="logout"
                onClick={() => setOpenDrawer(!openDrawer)}
              >
                <Typography
                  className="blue-button"
                  //   sx={{ ml: 4, mt: "0 !important" }}
                >
                  Login
                </Typography>
              </Link>
            </List>
          ) : (
            <List className="logout" onClick={() => setOpenDrawer(!openDrawer)}>
              <Link to="/login" onClick={handleLogout}>
                <Typography className="blue-button">Logout</Typography>
              </Link>
            </List>
          )}
        </Drawer>

        <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
          {openDrawer ? (
            <Close sx={{ fontSize: "1.7rem" }} />
          ) : (
            <Menu sx={{ fontSize: "1.7rem" }} />
          )}
        </IconButton>
      </Grid>
    </Grid>
  );
}
export default DrawerComponent;
