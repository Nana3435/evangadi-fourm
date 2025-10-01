const db = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");



const check = (req, res) => {

  const username = req.user.username;
  const userid = req.user.userid;


  return res.status(StatusCodes.OK).json({ username, userid });
};

module.exports = { register, login, check };
