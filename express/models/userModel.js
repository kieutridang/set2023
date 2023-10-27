const baseModel = require("./baseModel");

const userModel = {
  ...baseModel,
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
};
module.exports = userModel;
