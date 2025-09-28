


const postAnswer = (req,res)=>{
res.json({postAnswer:'post answer'})
}

const getAnswer = (req, res) => {
  res.json({ getAnswer: "get answer" });
};

module.exports = { postAnswer, getAnswer };