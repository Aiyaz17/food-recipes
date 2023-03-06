import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  FormControl,
  InputAdornment,
  Button,
  Stack,
  Grid,
  Paper,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import {
  Dining,
  MenuBook,
  AccessTimeFilled,
  Delete,
} from "@mui/icons-material/";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import config from "../../config";

const AddRecipe = ({ type, ...props }) => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    preparationTime: "",
    cookingTime: "",
    difficulty: "",
  });
  const [ingredients, setIngredients] = useState([""]);
  const [steps, setSteps] = useState([""]);
  const [images, setImages] = useState([]);

  useState(() => {
    if (type === 2) {
      const data = props.data;
      const tempRecipe = {
        name: data.name,
        description: data.description,
        preparationTime: data.preparationTime,
        cookingTime: data.cookingTime,
        difficulty: data.difficulty,
      };

      setRecipe(tempRecipe);
      setSteps(data.steps);
      setIngredients(data.ingredients);
    }
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // setError("");
    setRecipe((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddIngredient = () => {
    // setIngredients([...ingredients, { name: "", qty: "" }]);
    setIngredients([...ingredients, ""]);
  };

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    // newIngredients[index][event.target.name] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleAddStep = (e) => {
    setSteps([...steps, ""]);
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleStepChange = (index, event) => {
    const newSteps = [...steps];
    newSteps[index] = event.target.value;
    setSteps(newSteps);
  };
  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (type === 2) {
      const updatedData = {
        ...recipe,
        ingredients,
        steps,
      };
      props.editRecipe(updatedData);
      return;
    }
    // const combinedIngredients = ingredients.map(
    //   (ingredient) => ingredient.qty + " " + ingredient.name
    // );

    const formData = new FormData();
    formData.append("name", recipe.name);
    formData.append("description", recipe.description);
    formData.append("preparationTime", recipe.preparationTime);
    formData.append("cookingTime", recipe.cookingTime);
    formData.append("difficulty", recipe.difficulty);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("steps", JSON.stringify(steps));

    // Append each image to the FormData object
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    console.log(formData);

    const baseUrl = await config();
    const response = await axios.post(
      `${baseUrl}/api/recipe/create`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
    if (response.status === 200) {
      setRecipe({
        name: "",
        description: "",
        preparationTime: "",
        cookingTime: "",
        difficulty: "",
      });
      setIngredients([{ name: "", qty: "" }]);
      setSteps([""]);
      setImages([]);

      const target = document.querySelector("#create");
      target.scrollIntoView({ behavior: "smooth" });
      toast("Recipe Created Successfully!");
    }
  };

  return (
    <Box id="create" className="section add-recipe">
      <ToastContainer />

      <Typography
        className="primary-highlight open-sans title"
        variant="h2"
        sx={{ fontWeight: 600, textAlign: "center" }}
      >
        {type === 1 ? "Add New Recipe" : "Edit Recipe"}
      </Typography>

      <Card
        className="add-recipe-card"
        sx={{
          width: "100%",
          mt: 5,
        }}
      >
        <FormControl
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            gap: "30px",
            flexDirection: "column",
            p: 3,
          }}
        >
          {/* Name */}
          <TextField
            name="name"
            type="text"
            label="Recipe Name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Dining />
                </InputAdornment>
              ),
            }}
            onChange={handleChange}
            value={recipe.name}
            variant="outlined"
            required
          />
          {/* Description */}
          <TextField
            name="description"
            label="Description"
            multiline
            rows={2}
            maxRows={4}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <MenuBook />
                </InputAdornment>
              ),
            }}
            value={recipe.description}
            required
          />
          <Box
            className="duration-input-container"
            sx={{ display: "flex", gap: "50px" }}
          >
            {/* Duration */}
            <TextField
              name="preparationTime"
              label="Preparation Time in Minutes"
              type="number"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeFilled />
                  </InputAdornment>
                ),
              }}
              value={recipe.preparationTime}
              sx={{ flex: 1 }}
              required
            />
            <TextField
              name="cookingTime"
              // placeholder="Cooking Time in Minutes"
              type="number"
              onChange={handleChange}
              label="Cooking Time in Minutes"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeFilled />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
              value={recipe.cookingTime}
              required
            />
          </Box>

          <Box
            className="steps-ingredient-container"
            sx={{ display: "flex", gap: "50px" }}
          >
            {/* ingredient */}
            <Stack
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: "column",
                flex: 1,
                width: "100%",
              }}
            >
              <Typography variant="h6">Ingredients</Typography>
              {ingredients.map((ingredient, index) => (
                <Stack key={index} direction="row" spacing={2}>
                  <TextField
                    name="name"
                    label="Ingredient Name and Quantity"
                    value={ingredient}
                    sx={{ flex: 1 }}
                    required
                    onChange={(event) => handleIngredientChange(index, event)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Delete
                            onClick={() => handleRemoveIngredient(index)}
                            sx={{ color: "#FF5252", cursor: "pointer" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* <TextField
                    name="qty"
                    label="Quantity with units"
                    value={ingredient.qty}
                    sx={{ flex: 1 }}
                    onChange={(event) => handleIngredientChange(index, event)}
                  /> */}
                </Stack>
              ))}
              <Button onClick={handleAddIngredient} className="button-2">
                Add +
              </Button>
            </Stack>
            {/* steps */}
            <Stack
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                gap: "20px",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <Typography variant="h6">Steps</Typography>
              {steps.map((step, index) => (
                <Stack key={index} direction="row" spacing={2}>
                  <TextField
                    label={`Step ${index + 1}`}
                    value={step}
                    sx={{ flex: 1 }}
                    required
                    onChange={(event) => handleStepChange(index, event)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <Delete
                            onClick={() => handleRemoveStep(index)}
                            sx={{ color: "#FF5252", cursor: "pointer" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* <Button onClick={() => handleRemoveStep(index)}>
                    <Delete />
                  </Button> */}
                </Stack>
              ))}
              <Button onClick={handleAddStep} className="button-2">
                Add +
              </Button>
            </Stack>
          </Box>
          <Box
            className="image-difficulty-conatainer"
            sx={{ display: "flex", gap: "50px", mt: 2 }}
          >
            {/* difficulty */}
            <FormControl
              className="difficulty"
              sx={{
                flex: 1,
                height: "fit-content",
              }}
            >
              {/* <FormLabel id="demo-radio-buttons-group-label">
                Difficulty level
              </FormLabel> */}
              <Typography variant="h6"> Difficulty level</Typography>

              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="easy"
                name="difficulty"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",

                  border: "1px solid rgba(0, 0, 0, 0.23)",
                  p: 1,
                  mt: 2,
                }}
                value={recipe.difficulty}
                onChange={handleChange}
                required
              >
                <FormControlLabel
                  value="easy"
                  control={<Radio />}
                  label="Easy"
                />
                <FormControlLabel
                  value="medium"
                  control={<Radio />}
                  label="Medium"
                />
                <FormControlLabel
                  value="hard"
                  control={<Radio />}
                  label="Hard"
                />
              </RadioGroup>
            </FormControl>
            {/* Images */}
            {type !== 2 && (
              <Grid sx={{ flex: 1 }}>
                <Typography variant="h6">Upload Images</Typography>

                <Paper sx={{ mt: 2, p: 2, width: "93%" }}>
                  <label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      multiple
                      required
                    />
                  </label>
                </Paper>
              </Grid>
            )}
          </Box>

          <Button type="submit" className="button" sx={{ mt: 5, mx: "auto" }}>
            Submit
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
};

export default AddRecipe;
