const jwt = require("jsonwebtoken");

module.exports = async (id, role) => {
  return await jwt.sign({ id, role }, process.env.JWTKEY);
};
