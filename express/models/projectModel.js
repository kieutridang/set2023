const baseModel = require("./baseModel");

const projectModel = {
  ...baseModel,
  username: {
    type: "string",
    required: true,
    unique: true,
  },
  name: {
    type: "string",
    required: true,
  },
  creator: {
    type: "string",
    required: true,
  },
  quantityOfTasks: {
    type: "number",
  },
};
module.exports = projectModel;
