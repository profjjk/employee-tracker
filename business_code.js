// DEPENDENCIES
// ============================================================
const mysql = require('mysql');
const inquirer = require('inquirer');


// CONNECT TO LOCAL DATABASE
// ============================================================
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "business_db"
})