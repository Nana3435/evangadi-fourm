const db =require('../db/dbConfig')
const {StatusCodes} = require('http-status-codes')


const postAnswer =async (req,res)=>{
  const {questionid} = req.params
  const {userid,answer} = req.body
  

  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please fill the answer field" });
  }
  try {
    const [questions] = await db.query(
      "select questionid from questions where questionid=?",[questionid]
    );
    if (questions.length===0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "this question is no more available" });
    }
     await db.query("insert into answers(userid,questionid,answer) values (?,?,?)",[userid,questionid,answer]);
     return res
       .status(StatusCodes.CREATED)
       .json({ msg: "answer posted successfully" });
  } catch (error) {
    res.status(500).json({msg:error.message})
  }
}

const getAnswer = async(req, res) => {
  const {questionid} = req.params;

  try {
    const [questions] = await db.query(
      "select questionid from questions where questionid=?",
      [questionid]
    );
    if (questions.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "this question is no longer available" });
    }
    const [answers] = await db.query("select * from answers where questionid=?",[questionid]);
    return res.status(StatusCodes.ACCEPTED).json({ answers });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }

};

module.exports = { postAnswer, getAnswer };