import React, { useState, useRef } from "react";
import Recipes from "../Home/Recipes";
import ProtectedRoute from "../Auth/ProtectedRoute";
import config from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import EditRecipe from "../Home/AddRecipe";
import { Navigate, useAsyncError, useNavigate } from "react-router-dom";

const MyRecipes = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [recipeData, setRecipeData] = useState(null);
  const baseUrl = config();
  const navigate = useNavigate();
  const editRecipeSectionRef = useRef(null);

  const handleDeleteRecipe = async (e, _id) => {
    e.stopPropagation();
    e.preventDefault();
    const response = await axios.post(`${baseUrl}/api/recipe/delete`, {
      id: _id,
    });

    if (response.status === 200) {
      toast("Recipe Deleted Successfully");
    }
  };

  const triggerEdit = async (e, _id) => {
    e.stopPropagation();
    e.preventDefault();

    // setShowEditForm(true);
    const response = await axios.post(`${baseUrl}/api/recipe/single`, {
      id: _id,
    });

    if (response.status === 200) {
      setRecipeData(response.data.data);
      setShowEditForm(true);
      setTimeout(() => {
        if (editRecipeSectionRef && editRecipeSectionRef.current) {
          editRecipeSectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    }
  };

  const handleEditRecipe = async (updatedData) => {
    console.log(updatedData);
    const response = await axios.post(`${baseUrl}/api/recipe/edit`, {
      id: recipeData._id,
      updatedData,
    });
    console.log(response);
    if (response.status === 200) {
      toast("Recipe Updated Successfully");
      setShowEditForm(false);
      setRecipeData(null);
      window.scrollTo({ top: "0", behavior: "smooth" });
    }
  };

  return (
    <div>
      <ToastContainer />
      <Recipes
        type={2}
        deleteRecipe={handleDeleteRecipe}
        triggerEdit={triggerEdit}
      />
      <div ref={editRecipeSectionRef}>
        {showEditForm && (
          <EditRecipe
            type={2}
            data={recipeData}
            editRecipe={handleEditRecipe}
          />
        )}
      </div>
    </div>
  );
};

export default ProtectedRoute(MyRecipes);
