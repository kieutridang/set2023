const projectModel = {
  id: {
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
