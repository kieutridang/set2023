class AuthController {
    register(request, response) {
        response.send("API REGISTER");
        //   const user = request.body;

        //   const id = "uid" + new Date().getTime();

        //   const hashedPassword = user.password
        //     ? hashPassword(user.password)
        //     : undefined;

        //   const newUser = {
        //     id,
        //     ...user,
        //     password: hashedPassword,
        //   };

        //   userModel
        //     .create(newUser)
        //     .then(() => {
        //       response.json("success");
        //     })
        //     .catch((err) => {
        //       console.log(err);
        //       response.json(402, "failed");
        //     });
    }

    login(request, response) {
        response.send("API LOGIN from controller");
        // const checkingUser = request.body;
        // userModel
        //     .findOne({
        //         username: checkingUser.username,
        //         password: hashPassword(checkingUser.password),
        //     })
        //     .then((user) => {
        //         if (!user) {
        //             throw new Error("User not found");
        //         }
        //         const token = jwt.sign(
        //             { userId: user.id },
        //             "RANDOM_TOKEN_SECRET",
        //             {
        //                 expiresIn: "24h",
        //             }
        //         );
        //         const data = {
        //             token,
        //         };
        //         response.json(data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         response.json(402, "failed");
        //     });
    }
}
export default new AuthController();
