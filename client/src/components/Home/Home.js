import { Box } from "@mui/material";
import React from "react";
import Hero from "./Hero";
import Recipes from "./Recipes";
import RequireAuth from "../Auth/ProtectedRoute";
import AddRecipe from "./AddRecipe";
const Home = () => {
  return (
    <Box>
      <Hero />
      <Recipes type={1} />
      <AddRecipe type={1} />
    </Box>
  );
};

export default RequireAuth(Home);
