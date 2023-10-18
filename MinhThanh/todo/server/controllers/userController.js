const fs = require("fs");
const jwt = require("jsonwebtoken");
const {
  insertUser,
  verifyUser,
  handleAuthResponse,
  hashPassword,
} = require("./helpers");
const { userRepository } = require("../repositories");
const { handleError } = require("../helpers");

function register(request, response) {
  console.log("register");
  const user = request.body;

  insertUser(user)
    .then(() => {
      console.log("Log: register -> insertedUser");
      response.statusCode = 201;
      response.setHeader("Content-Type", "application/json");
      response.end("Sign up successfully.");
    })
    .catch((err) => {
      handleError(err, "controllers/index.js", "Register");
      // handleAuthResponse(response, false);
    });
}

function logIn(request, response) {
  const user = request.body;

  // response.setHeader("Content-Type", "application/json");
  // verifyUser(user)
  //   .then((foundUser) => {
  //     if (!foundUser) {
  //       throw new Error("User not found");
  //     }
  //     const token = jwt.sign({ userId: foundUser.id }, "RANDOM_TOKEN_SECRET", {
  //       expiresIn: "24h",
  //     });
  //     const data = {
  //       token,
  //     };
  //     response.end(JSON.stringify(data));
  //   })
  //   .catch((err) => {
  //     handleError(err, "controllers/index.js", "signIn");
  //     response.statusCode = 404;
  //     response.end("Username or password is not correct.");
  //   });
}

module.exports = {
  register,
  logIn,
};
