const mongoose = require("mongoose");

const uri = process.env.URI;
module.exports = () => {
  mongoose.connect(uri, () => {});
};
