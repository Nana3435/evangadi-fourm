const db=require('../db/dbConfig')



const register= async (req,res)=>{
  const {	username,	firstname,	lastname,	email,	password	
}=req.body
if (!username || !firstname || !lastname || !email || !password) {
  res.status(400).json({ error: "All fields are required" });
}
try {
  
} catch (error) {
  res.status(500).json({ error: "Server error" });
}
}

const login = (req, res) => {
  res.json({ register: "register" });
};

const check = (req, res) => {
  res.json({ register: "register" });
};

module.exports = {register,login,check}
