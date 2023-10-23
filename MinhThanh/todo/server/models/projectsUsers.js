const projectsUsersModel = {
  projectId: {
    type: "string",
    required: true,
  },
  userId: {
    type: "string",
    required: true,
  },
  userRole: {
    type: "string",
    required: true,
  },
};

module.exports = projectsUsersModel;
