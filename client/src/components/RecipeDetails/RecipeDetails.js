import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import config from "../../config";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import clock1Logo from "../../assets/icons/clock_1.png";
import clock2Logo from "../../assets/icons/clock_2.png";
import difficultyLogo from "../../assets/icons/difficulty.png";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./recipedetails.css";

const RecipeDetails = () => {
  const [recipeData, setRecipeData] = useState(null);
  const baseUrl = config();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    // axios.post()
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    // setShowEditForm(true);
    const response = await axios.post(`${baseUrl}/api/recipe/single`, {
      id: id,
    });

    if (response.status === 200) {
      setRecipeData(response.data.data);
    }
  };

  return (
    <Box className="recipe-details section" sx={{ mt: 17 }}>
      {recipeData && (
        <Box>
          <Box
            className="inner-container"
            sx={{ display: "flex", gap: "40px" }}
          >
            <Box className="img-container left">
              <Typography variant="h2" className="name open-sans">
                {recipeData.name}
              </Typography>
              <Typography
                variant="h6"
                className="description open-sans"
                sx={{ my: 4 }}
              >
                {recipeData.description}
              </Typography>
              <Swiper
                spaceBetween={50}
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
                navigation
                pagination={{ clickable: true }}
                className="img-carousel"
              >
                {recipeData.images.map((imgsrc) => (
                  <SwiperSlide>
                    <img src={imgsrc} alt="food img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
            <Box className="right">
              <Box className="info">
                <Box className="key-value-conatiner">
                  <img className="icon" src={clock1Logo} alt="clock1Logo" />
                  <Box>
                    <Typography className="value">
                      {recipeData.preparationTime} Mins
                    </Typography>
                    <Typography className="key">Preparation Time</Typography>
                  </Box>
                </Box>
                <Box className="key-value-conatiner">
                  <img className="icon" src={clock2Logo} alt="clock2Logo" />
                  <Box>
                    <Typography className="value">
                      {recipeData.cookingTime} Mins
                    </Typography>
                    <Typography className="key">Cooking Time</Typography>
                  </Box>
                </Box>
                <Box className="key-value-conatiner">
                  <img
                    className="icon"
                    src={difficultyLogo}
                    alt="difficultyLogo"
                  />
                  <Box>
                    <Typography className="value">
                      {recipeData.difficulty}
                    </Typography>
                    <Typography className="key">Difficulty</Typography>
                  </Box>
                </Box>
              </Box>
              <Box className="ingredients-container" sx={{ gap: "20px" }}>
                <Typography
                  variant="h5"
                  className="open-sans"
                  sx={{ mb: 2, fontWeight: "600", opacity: "0.86" }}
                >
                  Ingredients
                </Typography>
                {recipeData.ingredients.map((i) => (
                  <Typography className="ingredient">{i}</Typography>
                ))}
              </Box>
            </Box>
          </Box>
          <Box className="steps-container">
            <Typography
              variant="h3"
              className="open-sans title"
              sx={{ mt: 4, mb: 1, opacity: "0.85" }}
            >
              Directions
            </Typography>
            <Box>
              <List component={"ol"}>
                {recipeData.steps.map((step, index) => (
                  <ListItem component={"li"} sx={{ pl: 0 }}>
                    <Typography variant="h6" sx={{ opacity: "0.9" }}>
                      {`${index + 1}. ${step}`}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default RecipeDetails;
