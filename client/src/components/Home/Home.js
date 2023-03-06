import { Box } from "@mui/material";
import React, { useState } from "react";
import Hero from "./Hero";
import Recipes from "./Recipes";
import ProtectedRoute from "../Auth/ProtectedRoute";
import AddRecipe from "./AddRecipe";
const Home = () => {
  const [recipes, setRecipes] = useState([]);

  return (
    <Box>
      <Hero />
      <Recipes type={1} recipes={recipes} setRecipes={setRecipes} />
      <AddRecipe type={1} recipes={recipes} setRecipes={setRecipes} />
    </Box>
  );
};

export default ProtectedRoute(Home);
