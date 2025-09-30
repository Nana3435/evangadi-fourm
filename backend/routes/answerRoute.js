const express= require('express')
const { postAnswer, getAnswer } = require("../controller/answersController");
const answerRouter = express.Router()


answerRouter.post("/post-answer/:questionid", postAnswer);
answerRouter.get("/get-answer", getAnswer);

module.exports= answerRouter