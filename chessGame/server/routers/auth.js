import express from "express";
import authController from "../controllers/auth.js";
const router = express.Router();
router.post("/login", authController.login);

router.post("/register", (request, response) => {
  response.send("API REGISTER");
});

export default router;
