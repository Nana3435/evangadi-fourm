const db =require('../db/dbConfig')
const {StatusCodes} = require('http-status-codes');



const postAnswer =async (req,res)=>{

  // get necessary information from req params and body
  const { answer, questionid } = req.body;
  const {userid}= req.user
  
  // return error if an empty field is returned for answer field
  if (!answer) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please fill the answer field" });
  }
  try {
    // getting question id from questions table and check whether that question is there
    const [questions] = await db.query(
      `select questionid from questions where questionid=?`,[questionid]
    );
    if (questions.length===0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "this question is no more available" });
    }

    // post an answer 
     await db.query(`insert into answers(userid,questionid,answer) values (?,?,?)`,[userid,questionid,answer]);
     return res
       .status(StatusCodes.CREATED)
       .json({ msg: "answer posted successfully",data:{userid,answer} });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({msg:"Something goes wrong please try later"})
  }
}

const getAnswer = async(req, res) => {
  // get question id from req params
  const {questionid} = req.params;

  try {
    // getting question id from questions table and check whether that question is there
    const [questions] = await db.query(
      `select questionid from questions where questionid=?`,
      [questionid]
    );
    if (questions.length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "this question is no longer available" });
    }
    // fetching an answer for a specific question with a given question id
    const [answers] = await db.query(
      `select * from answers where questionid=?`,
      [questionid]
    );
    return res.status(StatusCodes.ACCEPTED).json({ answers });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Something goes wrong please try later" });
  }

};

module.exports = { postAnswer, getAnswer };