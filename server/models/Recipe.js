const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: [true, "Images field is required"],
  },
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  description: {
    type: String,
    required: [true, "Description field is required"],
  },
  ingredients: {
    type: [String],
    required: [true, "Ingredients field is required"],
  },
  preparationTime: {
    type: Number,
    required: [true, "Preparation time field is required"],
  },
  cookingTime: {
    type: Number,
    required: [true, "Preparation time field is required"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: [true, "Difficulty field is required"],
  },
  steps: {
    type: [String],
    required: [true, "Steps field is required"],
  },
  createdByUserId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  createdByUser: {
    type: String,
    required: true,
  },
});
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;
