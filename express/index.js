const express = require("express");
const routers = require("./routers");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { connectToDatabase } = require("./config/database");
const app = express();

app.use(bodyParser.json());
app.use("/api", routers);
connectToDatabase();
app.listen(3002, () => {
  console.log("Listening on http://localhost:3002");
});
