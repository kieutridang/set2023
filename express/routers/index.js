const express = require("express");
const authRouter = require("./authRouter");

const router = express.Router();
router.use("/auth", authRouter);
router.use("/", (req, res) => {
  res.send("Welcome");
});

module.exports = router;
