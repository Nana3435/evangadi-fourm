


const postQuestion= (req,res)=>{
res.json({questions:'questions'})
}

const getAllQuestions = (req, res) => {
  res.json({ allQuestions: "all questions" });
};

const getSingleQuestion = (req, res) => {
  res.json({ singleQuestion: "single question" });
};




module.exports = { postQuestion, getAllQuestions, getSingleQuestion };