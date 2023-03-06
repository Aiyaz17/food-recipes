const express = require("express");
require("dotenv").config();
const app = express();
require("./db_conn")();
var cors = require("cors");

const PORT = 9000;
const userRouter = require("./routers/userRouter");
const recipeRouter = require("./routers/recipeRouter");

app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/recipe", recipeRouter);

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(PORT, () => {
  console.log("Running on PORT", PORT);
});
