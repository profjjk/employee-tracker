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

// Start connection & begin prompts.
connection.connect(function(err) {
  if (err) throw err;
  mainMenu();
})


// PROMPTS & QUERIES
// ============================================================

// Main menu prompts.
function mainMenu() {
  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "1) ADD department",
      "2) ADD role",
      "3) ADD employee",
      "4) VIEW departments",
      "5) VIEW roles",
      "6) VIEW employees",
      "7) VIEW employees by manager",
      "8) UPDATE employee managers",
      "9) DELETE department",
      "10) DELETE role",
      "11) DELETE employee",
    ]
  })
}