const express = require("express");
const userRouter = express.Router();
const { register, login, check } = require("../controller/userController");

userRouter.post("/register", register);

userRouter.post("/login", login);

userRouter.get("/check", check);

module.exports = userRouter;
