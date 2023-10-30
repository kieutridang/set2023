const jwt = require("jsonwebtoken");
const { handleAuthResponse, hashPassword } = require("./heplers");
const { handleError } = require("../ultils");
const { userModel } = require("../models");

class AuthController {
  index(request, response) {
    response.send("AuthController");
  }

  register(request, response, next) {
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

    userModel
      .create(newUser)
      .then(() => {
        response.json("success");
      })
      .catch((err) => {
        console.log(err);
        response.json(402, "failed");
      });
  }

  login(request, response) {
    console.log("login");
    const checkingUser = request.body;
    userModel
      .findOne({
        username: checkingUser.username,
        password: hashPassword(checkingUser.password),
      })
      .then((user) => {
        if (!user) {
          throw new Error("User not found");
        }
        const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
          expiresIn: "24h",
        });
        const data = {
          token,
        };
        response.json(data);
      })
      .catch((err) => {
        console.log(err);
        response.json(402, "failed");
      });
  }
}

module.exports = new AuthController();
