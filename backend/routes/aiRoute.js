const express = require("express");
const {askAI,getAIHistory} = require('../controller/aiController.js')
const aiRouter = express.Router();

aiRouter.post("/ask", askAI);
aiRouter.get("/history", getAIHistory);

module.exports = aiRouter;
