import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { Edit, Delete } from "@mui/icons-material/";

// import food1 from "../../assets/foods/food1.webp";
import config from "../../config";
import { Link } from "react-router-dom";

const Recipes = ({ type, ...props }) => {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [cancelToken, setCancelToken] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);
  const baseUrl = config();

  useEffect(() => {
    fetchData(1);
  }, []);

  async function fetchData(pageNumber) {
    const response = await axios.get(
      `${baseUrl}/api/recipe/list?page=${pageNumber}&type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      setRecipes(...recipes, response.data.data);
      if (allRecipes.length === 0) setAllRecipes(response.data.data);

      console.log(response.data.data);
      if (totalPages == null) setTotalPages(response.data.totalPages);
    }
  }

  const loadMore = () => {
    fetchData(page + 1);
    setPage(page + 1);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    console.log("searching", event.target.value);
    if (event.target.value === "") {
      setRecipes(allRecipes);
    } else {
      handleSearchSubmit(event);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (cancelToken) {
      cancelToken.cancel("Search request cancelled");
    }
    const newCancelToken = axios.CancelToken.source();
    setCancelToken(newCancelToken);

    try {
      const response = await axios.get(
        `${baseUrl}/api/recipe/search?keywords=${searchValue}`,
        { cancelToken: newCancelToken.token }
      );
      if (response.status === 200) {
        setRecipes(response.data.data);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Search request cancelled");
      } else {
        console.error(err);
      }
    }
  };

  const handleDeleteRecipe = (e, _id, index) => {
    e.stopPropagation();
    e.preventDefault();
    // console.log(e.target, _id, index);
    const tempRecipes = [...recipes];
    tempRecipes.splice(index, 1);
    setRecipes(tempRecipes);
    props.deleteRecipe(e, _id);
    setDialogOpen(false);
  };

  const toggleOpenDialog = (e) => {
    e.preventDefault();
    setDialogOpen(!dialogOpen);
  };

  const RecipeCard = ({ index, _id, img, name, duration }) => {
    return (
      <Card className="recipe-card">
        <img src={img} alt="dish" />
        <Box className="content">
          <Typography className="open-sans name" variant="h4">
            {name}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography className="duration colored">
              {duration} Mins
            </Typography>

            {type === 2 && (
              <Box className="edit-delete-buttons">
                <Edit
                  className="colored"
                  sx={{ p: 1, borderRadius: "50%" }}
                  onClick={(e) => props.triggerEdit(e, _id)}
                />

                <Delete
                  className="colored"
                  onClick={toggleOpenDialog}
                  sx={{ p: 1, borderRadius: "50%" }}
                />

                <Dialog open={dialogOpen} onClose={toggleOpenDialog}>
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete this item?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={toggleOpenDialog}>Cancel</Button>
                    <Button
                      onClick={(e) => handleDeleteRecipe(e, _id, index)}
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    );
  };

  return (
    <Box className="section recipes" id="recipes" sx={{ minHeight: "100vh" }}>
      <Typography
        className="primary-highlight open-sans title"
        variant="h2"
        sx={{ fontWeight: 600, mt: 13, textAlign: "center" }}
      >
        {type === 1 ? "Latest Recipes" : "My Recipes"}
      </Typography>
      <Box
        sx={{ width: "100%", position: "relative", mt: 5 }}
        className="search-bar-container"
      >
        {/* <i className="fas fa-search" ariaHidden="true"></i> */}
        <form onSubmit={handleSearchSubmit}>
          <TextField
            className="search-bar"
            variant="outlined"
            // label="Search by Recipe Name or Ingredients"
            placeholder="Search by Recipe Name or Ingredients"
            onChange={handleSearchChange}
            onPaste={handleSearchChange}
            value={searchValue}
            sx={{
              mt: 3,
              border: 0,
              outline: 0,
              mx: "auto",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    onClick={handleSearchSubmit}
                    sx={{ cursor: "pointer" }}
                  />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <Button
                    type="submit"
                    className="button"
                    sx={{ padding: "3px 25px!important" }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Box>
      <Box
        className="recipes-container"
        sx={{
          mt: 10,
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
        }}
      >
        {recipes.length > 0 ? (
          recipes.map((recipe, key) => {
            return (
              <Link
                key={key}
                to={`/recipe/${recipe.name}?id=${recipe._id}`}
                className="recipe-card-link"
              >
                <RecipeCard
                  _id={recipe._id}
                  img={recipe.img}
                  name={recipe.name}
                  duration={recipe.duration}
                  index={key}
                />
              </Link>
            );
          })
        ) : (
          <Typography variant="h4" sx={{ opacity: "0.7" }}>
            No recipes
          </Typography>
        )}
        {page < totalPages && (
          <Button className="button" onClick={loadMore}>
            See More..
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Recipes;
