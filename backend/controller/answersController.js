const db =require('../db/dbConfig')


const postAnswer =async (req,res)=>{
  const {questionid} = req.params
  const {userid,answer} = req.body
  

  if (!answer) {
    return res.status(400).json({msg:"please fill the answer field"})
  }
  try {
    const [questions] = await db.query(
      "select questionid from questions where questionid=?",[questionid]
    );
    if (questions.length===0) {
      return res.status(400).json({msg:'this question is no more available'})
    }
     await db.query("insert into answers(userid,questionid,answer) values (?,?,?)",[userid,questionid,answer]);
     return res.status(202).json({msg:"answer posted successfully"})
  } catch (error) {
    res.status(500).json({msg:"something goes wrong please try again later!"})
  }
}

const getAnswer = (req, res) => {
  res.json({ getAnswer: "get answer" });
};

module.exports = { postAnswer, getAnswer };