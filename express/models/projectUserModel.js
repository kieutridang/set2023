const projectUserModel = {
  projectId: {
    type: "string",
    required: true,
  },
  userId: {
    type: "string",
  },
  userRole: {
    type: "string",
    required: true,
  },
};
module.exports = projectUserModel;
