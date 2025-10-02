const db = require("../db/dbConfig");


const checkQuestionExists = async (questionid) => {
  const [rows] = await db.execute(
    "SELECT * FROM questions WHERE questionid = ?",
    [questionid]
  );
  return rows.length > 0;
};

// POST an answer
const postAnswer = async (req, res) => {
  const { questionid, answer } = req.body;
  const { userid } = req.user; 

  if (!questionid || !answer) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Please provide questionid and answer",
    });
  }

  try {
   
    if (!(await checkQuestionExists(questionid))) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Question does not exist",
      });
    }

    // Insert answer
    await db.execute(
      "INSERT INTO answers (questionid, userid, answer) VALUES (?, ?, ?)",
      [questionid, userid, answer]
    );

    res.status(201).json({ message: "Answer posted successfully" });
  } catch (error) {
    console.error("Error posting answer:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};

// GET answers for a specific question
const getAnswer = async (req, res) => {
  const { question_id } = req.params; // match the route param name

  try {
    // Check if question exists
    if (!(await checkQuestionExists(question_id))) {
      return res.status(404).json({
        error: "Not Found",
        message: "The requested question could not be found.",
      });
    }

    // Fetch answers
    const [rows] = await db.execute(
      "SELECT * FROM answers WHERE questionid = ?",
      [question_id]
    );

    
    const answers = rows.map((row) => ({
      answerId: row.answerid,
      questionId: row.questionid,
      userId: row.userid,
      answerText: row.answer,
    }));

    res.status(200).json({ answers });
  } catch (error) {
    console.error("Error fetching answers:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
};


module.exports = { postAnswer, getAnswer };
