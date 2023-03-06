const router = require("express").Router();
const multer = require("multer");
const {
  create,
  edit,
  deleteRecipe,
  list,
  single,
  search,
} = require("../controllers/recipeController");
const upload = require("../middleware/upload");
const verifyToken = require("../utils/jwt-auth/verifyToken");
router.post("/create", verifyToken, multer().array("images"), create);

router.post("/edit", edit);
router.post("/delete", deleteRecipe);
router.get("/list",verifyToken, list);
router.post("/single", single);
router.get("/search", search);

module.exports = router;
