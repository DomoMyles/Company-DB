const mysql = require('mysql2')


const server = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "School1442!",
    port: 3306,
    database: "company_db"
  });
 

   module.exports = server

