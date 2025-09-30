const crypto = require('crypto');
const db = require('../db/dbConfig');

const postQuestion = async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                error: true,
                message: "Title and description are required"
            });
        }

        const defaultUserId = 1; 
        
        // Generate UUID using crypto module 
        const questionid = crypto.randomUUID(); 

        const query = `
            INSERT INTO questions (userid, questionid, title, description, tag) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const [result] = await db.execute(query, [
            defaultUserId, 
            questionid, 
            title, 
            description, 
            tag || null
        ]);

        res.status(201).json({
            error: false,
            message: "Question posted successfully",
            data: {
                questionid: questionid,
                title: title,
                description: description,
                tag: tag
            }
        });

    } catch (error) {
        console.error('Error posting question:', error);
        res.status(500).json({
            error: true,
            message: "Internal server error",
            details: error.message
        });
    }
}


const getAllQuestions = (req, res) => {
  res.json({ allQuestions: "all questions" });
};

const getSingleQuestion = (req, res) => {
  res.json({ singleQuestion: "single question" });
};




module.exports = { postQuestion, getAllQuestions, getSingleQuestion };