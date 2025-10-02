// const express = require('express')
// const questionRouter= express.Router()
// const {
//   postQuestion,
//   getAllQuestions,
//   getSingleQuestion,
// } = require("../controller/questionsController");

// questionRouter.post("/post-question", postQuestion);
// questionRouter.get("/all-questions", getAllQuestions);
// questionRouter.get("/single-question", getSingleQuestion);

// module.exports= questionRouter

const express = require("express");
const router = express.Router();
const {
  postQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionsController.js");

// GET /api/questions - Get all questions
router.get("/all-questions", getAllQuestions);

questionRouter.post("/post-question", postQuestion);
questionRouter.get("/all-questions", getAllQuestions);
questionRouter.get("/single-question/:questionid", getSingleQuestion);

// POST /api/questions - Create new question
router.post("/", postQuestion);

// // PUT /api/questions/:id - Update question
// router.put("/:id", updateQuestion);

// // DELETE /api/questions/:id - Delete question
// router.delete("/:id", deleteQuestion);

module.exports = router;
