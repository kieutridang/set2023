const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const verifyToken = require("../middleware/authenticate");
const {addUser, loginUser, getUser} = require("../controllers");

const router = express.Router();

router.post("/register-user", addUser);

router.post("/login-user", loginUser);

router.get("/get-user", verifyToken, getUser);


module.exports = router; 