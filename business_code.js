// DEPENDENCIES
// ============================================================
const mysql = require('mysql');
const inquirer = require('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');


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
      "ADD role",
      "ADD department",
      "ADD employee",
      "VIEW departments",
      "VIEW roles",
      "VIEW employees",
      "VIEW employees by manager",
      "UPDATE employee managers",
      "DELETE department",
      "DELETE role",
      "DELETE employee",
    ]
  }).then(function(userChoice) {
    switch (userChoice.action) {
      case "ADD role":
        addRole();
        break;
      case "ADD department":
        addDept();
        break;
      case "ADD employee":
        addEmployee();
        break;
      case "VIEW departments":
        viewDepts();
        break;
      case "VIEW roles":
        viewRoles();
        break;
      case "VIEW employees":
        viewEmployees();
        break;
      case "VIEW employees by manager":
        viewEmpManager();
        break;
      case "UPDATE employee managers":
        updEmpManager();
        break;
      case "DELETE department":
        deleteDept();
        break;
      case "DELETE role":
        deleteRole();
        break;
      case "DELETE employee":
        deleteEmp();
        break;
    }
  })
}