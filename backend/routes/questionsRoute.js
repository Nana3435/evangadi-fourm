const express = require('express')
const questionRouter= express.Router()
const {
  postQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionsController");

questionRouter.post("/post-question", postQuestion);
questionRouter.get("/all-questions", getAllQuestions);
questionRouter.get("/single-question/:questionid", getSingleQuestion);



module.exports= questionRouter

