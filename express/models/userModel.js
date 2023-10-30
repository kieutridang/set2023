const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const baseSchema = require("./baseModel");

const userSchema = new Schema({
  ...baseSchema,
  username: {
    type: "string",
    required: true,
    unique: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  fullName: {
    type: "string",
    required: true,
  },
  phoneNumber: {
    type: "string",
    required: true,
  },
  password: {
    type: "string",
    required: true,
  },
});

const userModel = model("User", userSchema);
module.exports = userModel;
