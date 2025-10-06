const express = require("express");
const questionRouter = express.Router();
const {
  postQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionsController.js");


questionRouter.post("/post-question", postQuestion);
questionRouter.get("/all-questions", getAllQuestions);
questionRouter.get("/single-question/:questionid", getSingleQuestion);



// // PUT /api/questions/:id - Update question
// router.put("/:id", updateQuestion);

// // DELETE /api/questions/:id - Delete question
// router.delete("/:id", deleteQuestion);

module.exports = questionRouter;
