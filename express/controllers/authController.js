const jwt = require("jsonwebtoken");
const { handleAuthResponse, hashPassword } = require("./heplers");
const { handleError } = require("../ultils");
const { userRepository } = require("../repositories");

class AuthController {
  index(request, response) {
    response.send("AuthController");
  }

  register(request, response) {
    console.log("register");
    const user = request.body;
    console.log(user);

    const id = "uid" + new Date().getTime();

    const hashedPassword = user.password
      ? hashPassword(user.password)
      : undefined;

    const newUser = {
      id,
      ...user,
      password: hashedPassword,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    console.log("newUser", newUser);
    userRepository
      .createOne(newUser)
      .then(() => {
        console.log("Log: Registered");
        handleAuthResponse(response, 201, true, "sign up successfully");
      })
      .catch((error) => {
        handleError(error, "controllers/index.js", "Register");
        handleAuthResponse(response, 402, false, error.toString());
      });
  }

  // login(request, response) {
  //   console.log("login");
  //   const checkingUser = request.body;

  //   response.setHeader("Content-Type", "application/json");
  //   userRepository
  //     .find()
  //     .then((users) => {
  //       const foundUser = users.find(
  //         (user) =>
  //           user.username === checkingUser.username &&
  //           user.password === hashPassword(checkingUser.password)
  //       );
  //       if (!foundUser) {
  //         throw new Error("User not found");
  //       }
  //       const token = jwt.sign(
  //         { userId: foundUser.id },
  //         "RANDOM_TOKEN_SECRET",
  //         {
  //           expiresIn: "24h",
  //         }
  //       );
  //       const data = {
  //         token,
  //       };
  //       response.end(JSON.stringify(data));
  //     })
  //     .catch((err) => {
  //       handleError(err, "controllers/index.js", "logIn");
  //       response.statusCode = 404;
  //       response.end("Username or password is not correct.");
  //     });
  // }
}

module.exports = new AuthController();
