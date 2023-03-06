import React from "react";
import { Box, Button, Typography } from "@mui/material";
import heroImg from "../../assets/3d_foods/food_3.png";
import "./Home.css";
import { HashLink as Link } from "react-router-hash-link";

const Hero = () => {
  return (
    <Box
      className="hero-container section"
      id="#top"
      sx={{ display: "flex", alignItems: "center", pr: "5%", pb: 3 }}
    >
      <Box sx={{ flex: 1 }} className="hero-left">
        <Typography variant="h1" sx={{ fontWeight: "bolder", opacity: "0.86" }}>
          <span className="primary-highlight">Cook, </span>Share, Enjoy
        </Typography>
        <Typography variant="h5" sx={{ mt: 4, opacity: "0.86" }}>
          {/* <Typography
            variant="span"
            className="primary-highlight"
            sx={{ fontWeight: "bold" }}
          >
            Recipe Community,
          </Typography>{" "} */}
          From Classic Dishes to New Favorites, Find Your Next Meal Here and
          start cooking now.
        </Typography>
        <Link to="#recipes">
          <Button className="button" sx={{ mt: 4 }}>
            Check all Recipes
          </Button>
        </Link>
      </Box>
      <Box sx={{ flex: 1 }} className="hero-right">
        <img src={heroImg} alt="hero-img" />
      </Box>
    </Box>
  );
};

export default Hero;
