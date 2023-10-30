const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authenticate");
const {addTask, getAllTask, updateTask, deleteTask, deleteAllTask} = require("../controllers");

router.post("/add-task", verifyToken, addTask);

router.get("/get-task", verifyToken, getAllTask);

router.put("/update-task/:id", verifyToken, updateTask);

router.delete("/delete-task/:id", verifyToken, deleteTask);

// router.delete("/delete-tasks", verifyToken, deleteAllTask);

module.exports = router;