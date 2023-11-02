var express = require("express");
var router = express.Router();
const UserController = require("../controllers/UserController");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */
const userController = new UserController();
//[GET] /users
router.get("/", async function (req, res, next) {
  try {
    const users = await userController.getUsers(req, res);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//[POST] /users
router.post("/", async function (req, res, next) {
  try {
    const userData = req.body;
    const user = await userController.createUser(userData);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//[GET] /users/:slug
router.get("/:slug", async function (req, res, next) {
  try {
    const userBody = req.body;
    const user = await userController.getUser(userBody);
    res.status(200).json(user);
    next();
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//[DELETE] /users/:slug
router.delete("/:slug", async function (req, res, next) {

  try {
    const id = req.url.split("/")[1];
    const message = await userController.deleteUser(id);
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

//[PATCH] /users/:slug
router.patch("/", async function (req, res, next) {
  try {
    const id = req.url.split("/")[1];
    const newUser = req.body;
    const updatedUser = await userController.updateUser(id, newUser);
    res.status(200).json(updatedUser);
    next();
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

module.exports = router;
