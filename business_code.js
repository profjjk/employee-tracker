// DEPENDENCIES
// ============================================================
const mysql = require('mysql');
const inquirer = require('inquirer');


// CONNECT TO LOCAL DATABASE
// ============================================================
// Configure connection.
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "business_db"
})

// Start connection.
connection.connect(function(err) {
  if (err) throw err;
  mainMenu();
})


// PROMPTS & QUERIES
// ============================================================
