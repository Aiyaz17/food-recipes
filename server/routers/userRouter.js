const router = require("express").Router();
const { create, login } = require("../controllers/userController");
const verifyLogin = require("../utils/jwt-auth/verifyLogin");

router.post("/register", create);
router.post("/login", verifyLogin, login);

module.exports = router;
