const mysql=require('mysql2')



const db=mysql.createPool({
  user: "evangadi-forum",
  host: "localhost",
  password: "123456789",
  database: "evangadi-project-db",
  connectionLimit:10,
});


module.exports = db.promise()