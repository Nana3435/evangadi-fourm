const mysql=require('mysql2')



const db = mysql.createPool({
  user: process.env.USER,
  host: "localhost",
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10,
});


module.exports = db.promise()