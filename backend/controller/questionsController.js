const dbConnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function getAllQuestions(req, res) {
  try {
    const [rows] = await dbConnection.execute(`
      SELECT q.*, u.username, u.firstname, u.lastname
      FROM questions q
      JOIN users u ON q.userid = u.userid
      ORDER BY q.id DESC
    `);
    if (!rows.length) {
      return res.status(404).json({
        error: true,
        message: "No questions found.",
      });
    }
    res.status(200).json({
      error: false,
      message: "Questions retrieved successfully",
      data: rows,
      count: rows.length,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      details: error.message,
    });
  }
}

async function getSingleQuestion(req, res) {
  try {
    const questionid = req.params.questionid;
    if (!questionid) {
      return res.status(400).json({
        error: true,
        message: "Invalid question ID format",
      });
    }
    const [rows] = await dbConnection.execute(
      `SELECT q.*, u.username, u.firstname, u.lastname
       FROM questions q
       JOIN users u ON q.userid = u.userid
       WHERE q.questionid = ?`,
      [questionid]
    );
    if (!rows.length) {
      return res.status(404).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }
    res.status(200).json({
      error: false,
      message: "Question retrieved successfully",
      data: rows[0],
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "Internal server error",
      details: error.message,
    });
  }
}

// Create new question in MySQL

async function postQuestion(req, res) {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({
        error: true,
        message: "Request body is missing or invalid JSON.",
      });
    }
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({
        error: true,
        message: "Title and content are required",
      });
    }
    if (title.length > 200) {
      return res.status(400).json({
        error: true,
        message: "Title must be less than 200 characters",
      });
    }
    const tagString = Array.isArray(tags) ? tags.join(",") : tags || null;
    // For now, use userid=1. You may want to get this from auth in production.
    const [result] = await dbConnection.execute(
      "INSERT INTO questions (questionid, title, description, tag, userid) VALUES (NULL, ?, ?, ?, ?)",
      [title, content, tagString, 1]
    );
    // Join user info for the response, as in getAllQuestions
    const [rows] = await dbConnection.execute(
      `SELECT q.*, u.username, u.firstname, u.lastname
       FROM questions q
       JOIN users u ON q.userid = u.userid
       WHERE q.id = ?`,
      [result.insertId]
    );
    res.status(201).json({
      error: false,
      message: "Question created successfully",
      data: rows[0],
    });
  } catch (error) {
    console.error("Error in postQuestion:", error);
    res.status(500).json({
      error: true,
      message: "Internal server error while creating question",
      details: error.message,
    });
  }
}

// // Bonus: Update question (if you need it)
// const updateQuestion = (req, res) => {
//   try {
//     const questionId = parseInt(req.params.id);
//     const { title, content, tags } = req.body;

//     const questionIndex = questions.findIndex((q) => q.id === questionId);

//     if (questionIndex === -1) {
//       return res.status(404).json({
//         status: "error",
//         message: "Question not found",
//         data: null,
//       });
//     }

//     // Update question
//     if (title) questions[questionIndex].title = title;
//     if (content) questions[questionIndex].content = content;
//     if (tags) questions[questionIndex].tags = tags;
//     questions[questionIndex].updatedAt = new Date();

//     res.status(200).json({
//       status: "success",
//       message: "Question updated successfully",
//       data: {
//         question: questions[questionIndex],
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       data: null,
//     });
//   }
// };

// // Bonus: Delete question (if you need it)
// const deleteQuestion = (req, res) => {
//   try {
//     const questionId = parseInt(req.params.id);

//     const questionIndex = questions.findIndex((q) => q.id === questionId);

//     if (questionIndex === -1) {
//       return res.status(404).json({
//         status: "error",
//         message: "Question not found",
//         data: null,
//       });
//     }

//     // Remove question
//     const deletedQuestion = questions.splice(questionIndex, 1)[0];

//     res.status(200).json({
//       status: "success",
//       message: "Question deleted successfully",
//       data: {
//         question: deletedQuestion,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       data: null,
//     });
//   }
// };

module.exports = {
  postQuestion,
  getAllQuestions,
  getSingleQuestion,
};
