const crypto = require("crypto");
const db = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

const postQuestion = async (req, res) => {
  const { username, userid } = req.user;
  // const userid = 6; // temporary for testing without auth
  try {
    //extract data from request body
    const { title, description, tag } = req.body;
    //validation
    if (!title || !description) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: "Title and description are required",
      });
    }
    //later this will be replaced by actual user id

    // Generate UUID using crypto module modern method
    const questionid = crypto.randomUUID();
    const query = `
            INSERT INTO questions (userid, questionid, title, description, tag) 
            VALUES (?, ?, ?, ?, ?)
        `;
    //execute query
    const [result] = await db.execute(query, [
      userid,
      questionid,
      title,
      description,
      tag || null,
    ]);

    res.status(StatusCodes.CREATED).json({
      error: false,
      message: "Question posted successfully",
      data: {
        questionid: questionid,
        title: title,
        description: description,
        tag: tag,
        userid: userid,
      },
    });
  } catch (error) {
    console.error("Error posting question:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: "Internal server error",
      details: error.message,
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    // SQL query to get all questions with user information
    const query = `
            SELECT 
                q.questionid,
                q.title,
                q.description,
                q.tag,
                q.id,
                q.created_at,
                u.userid,
                u.username,
                u.firstname,
                u.lastname
            FROM questions q
            JOIN users u ON q.userid = u.userid
            ORDER BY q.id DESC
        `;
    //destructure the result to get only the rows
    const [questions] = await db.execute(query);

    // Check if questions exist
    if (questions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: true,
        message: "No questions found",
        data: [],
      });
    }

    res.status(StatusCodes.OK).json({
      error: false,
      message: "Questions retrieved successfully",
      data: questions,
      count: questions.length,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: "Internal server error",
      details: error.message,
    });
  }
};

const getSingleQuestion = async (req, res) => {
  try {
    // Extract questionid from request parameters
    const { questionid } = req.params;

    // Validate questionid parameter
    if (!questionid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: true,
        message: "Question ID is required",
      });
    }

    // SQL query to get single question with user information
    const query = `
            SELECT 
                q.questionid,
                q.title,
                q.description,
                q.tag,
                q.id,
                q.created_at,
                u.userid,
                u.username,
                u.firstname,
                u.lastname
            FROM questions q
            JOIN users u ON q.userid = u.userid
            WHERE q.questionid = ?
        `;

    const [questions] = await db.execute(query, [questionid]);

    // Check if question exists
    if (questions.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: true,
        message: "Question not found",
        data: null,
      });
    }

    // Return the single question
    res.status(StatusCodes.OK).json({
      error: false,
      message: "Question retrieved successfully",
      data: questions[0], // Return the first (and only) result
    });
  } catch (error) {
    console.error("Error fetching single question:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: true,
      message: "Internal server error",
      details: error.message,
    });
  }
};

module.exports = { postQuestion, getAllQuestions, getSingleQuestion };
