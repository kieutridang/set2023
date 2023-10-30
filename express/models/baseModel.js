const baseSchema = {
  id: {
    type: "string",
    required: true,
    unique: true,
  },
  createdAt: {
    type: "Date",
    default: Date.now(),
  },
  updatedAt: {
    type: "Date",
    default: Date.now(),
  },
};
module.exports = baseSchema;
