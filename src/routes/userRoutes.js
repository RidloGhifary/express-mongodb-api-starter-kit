const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

// Public route for user registration
router.post("/register", userController.registerUser);

// Public route for user login
router.post("/login", userController.loginUser);

// Protected route to get user profile
router.get("/profile", auth, userController.getUserProfile);

module.exports = router;
