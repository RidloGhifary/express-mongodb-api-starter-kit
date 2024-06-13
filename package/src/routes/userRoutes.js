const { Router } = require("express");
const { Login } = require("../controllers/userController");

const router = Router();

router.post("/users/login", Login);

module.exports = router;
