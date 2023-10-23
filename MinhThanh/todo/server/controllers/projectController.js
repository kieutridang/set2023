const jwt = require("jsonwebtoken");
const { projectRepository, projectUserRepository } = require("../repositories");
const { handleAuthResponse, insertTask } = require("./helpers");
const { handleError } = require("../helpers");

function createProject(request, response) {
  const { token, projectName } = request.body;
  const id = "pid" + new Date().getTime();

  const newProject = {
    id,
    name: projectName,
    creator: jwt.verify(token, "RANDOM_TOKEN_SECRET").userId,
    quantityOfTasks: 0,
  };

  const information = {
    projectId: id,
    userId: jwt.verify(token, "RANDOM_TOKEN_SECRET").userId,
    userRole: "admin",
  };

  projectRepository.createOne(newProject);
  projectUserRepository
    .createOne(information)
    .then(() => {
      console.log("Log: createProject -> insertedProject");
      handleAuthResponse(response, true);
    })
    .catch((err) => {
      handleError(err, "controllers/index.js", "createProject");
      handleAuthResponse(response, false);
    });
}

module.exports = {
  createProject,
};
