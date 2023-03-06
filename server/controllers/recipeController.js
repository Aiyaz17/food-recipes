const AWS = require("aws-sdk");
const Recipe = require("../models/Recipe");
const catchAsync = require("../utils/error-handling/catchAsync");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const create = catchAsync(async (req, res, next) => {
  const {
    name,
    description,
    ingredients,
    preparationTime,
    cookingTime,
    difficulty,
    steps,
  } = req.body;

  const images = req.files;

  console.log(images);

  const uploadedImages = await Promise.all(
    images.map((img) => {
      const params = {
        Bucket: process.env.BUCKETNAME,
        Key: `${name}${req.user.name}${img.originalname}`,
        Body: img.buffer,
      };
      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(
              `File uploaded successfully. File URL: ${data.Location}`
            );
            resolve(data.Location);
          }
        });
      });
    })
  );
  console.log(uploadedImages);

  const recipe = new Recipe({
    name,
    description,
    difficulty,
    ingredients: JSON.parse(ingredients),
    preparationTime,
    cookingTime,
    steps: JSON.parse(steps),
    images: uploadedImages,
    createdByUserId: req.user._id,
    createdByUser: req.user.name,
  });

  console.log({ uploadedImages });
  const newRecipe = await Recipe.create(recipe);
  res.status(200).json({
    status: "Success",
    data: {
      newRecipe,
    },
  });
});

const edit = catchAsync(async (req, res, next) => {
  const { id, updatedData } = req.body;
  const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "Success",
    data: {
      updatedRecipe,
    },
  });
});

const deleteRecipe = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  // console.log({ id });
  const response = await Recipe.findByIdAndDelete(id);
  // console.log(response);
  res.status(200).json({
    status: "Success",
    data: {},
  });
});

const list = catchAsync(async (req, res, next) => {
  const { page, type } = req.query;
  const limit = 9;
  const skip = (page - 1) * limit;

  const totalRecipes = await Recipe.countDocuments();
  const totalPages = Math.ceil(totalRecipes / limit);

  let query = {};
  if (type == 2) query = { createdByUserId: req.user._id };
  var recipes = await Recipe.find(query, {
    images: 1,
    name: 1,
    preparationTime: 1,
    cookingTime: 1,
  })
    .skip(skip)
    .limit(limit);

  recipes = recipes.map((recipe) => {
    return {
      _id: recipe._id,
      img: recipe.images[0],
      duration: recipe.preparationTime + recipe.cookingTime,
      name: recipe.name,
    };
  });

  // console.log({ recipes, query });

  res.status(200).json({
    status: "Success",
    data: [...recipes],
    totalPages: totalPages,
  });
});

const single = catchAsync(async (req, res, next) => {
  const { id } = req.body;
  const recipe = await Recipe.findById(id);
  // console.log({ id, recipe });
  res.status(200).json({
    status: "Success",
    data: { ...recipe._doc },
  });
});

const search = catchAsync(async (req, res, next) => {
  const { keywords } = req.query;
  var recipes = await Recipe.find(
    {
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
        { ingredients: { $regex: keywords, $options: "i" } },
      ],
    },
    { images: 1, name: 1, preparationTime: 1, cookingTime: 1 }
  );

  recipes = recipes.map((recipe) => {
    return {
      img: recipe.images[0],
      duration: recipe.preparationTime + recipe.cookingTime,
      name: recipe.name,
    };
  });
  res.status(200).json({
    status: "Success",
    data: [...recipes],
  });
});

module.exports = {
  create,
  edit,
  deleteRecipe,
  list,
  single,
  search,
};
