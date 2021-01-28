// DEPENDENCIES
// ============================================================
const mysql = require('mysql');


// CONFIGURE DATABASE CONNECTION
// ============================================================
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "business_db"
})

module.exports = connection;