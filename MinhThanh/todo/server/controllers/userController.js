const fs = require("fs");
const jwt = require("jsonwebtoken");
const { verifyUser, handleAuthResponse, hashPassword } = require("./helpers");
const { handleError } = require("../helpers");
const { userRepository } = require("../repositories");

function register(request, response) {
  console.log("register");
  const user = request.body;

  const id = "uid" + new Date().getTime();

  const hashedPassword = user.password
    ? hashPassword(user.password)
    : undefined;
  const newUser = {
    id,
    ...user,
    password: hashedPassword,
  };
  userRepository
    .createOne(newUser)
    .then(() => {
      console.log("Log: register -> insertedUser");
      response.statusCode = 201;
      response.setHeader("Content-Type", "application/json");
      response.end("Sign up successfully.");
    })
    .catch((err) => {
      handleError(err, "controllers/index.js", "Register");
      handleAuthResponse(response, false);
    });
}

async function logIn(request, response) {
  console.log("login");
  const checkingUser = request.body;

  response.setHeader("Content-Type", "application/json");
  userRepository
    .find()
    .then((users) => {
      const foundUser = users.find(
        (user) =>
          user.username === checkingUser.username &&
          user.password === hashPassword(checkingUser.password)
      );
      if (!foundUser) {
        throw new Error("User not found");
      }
      const token = jwt.sign({ userId: foundUser.id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h",
      });
      const data = {
        token,
      };
      response.end(JSON.stringify(data));
    })
    .catch((err) => {
      handleError(err, "controllers/index.js", "logIn");
      response.statusCode = 404;
      response.end("Username or password is not correct.");
    });
}

module.exports = {
  register,
  logIn,
};
