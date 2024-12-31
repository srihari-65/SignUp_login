const express = require("express");
const { signup, login } = require("../controllers/userControllers");

const router = express.Router();

// Routes for authentication
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
