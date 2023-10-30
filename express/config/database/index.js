const mongoose = require("mongoose");
require("dotenv").config();

async function connectToDatabase() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.USERNAMEMONGODB}:${process.env.PASSWORDMONGODB}@alien.77u7gvp.mongodb.net/todo`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Connection failed: " + error);
  }
}
module.exports = { connectToDatabase };
