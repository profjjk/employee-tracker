// DEPENDENCIES
// ============================================================
const connection = require('./connection');
const inquirer = require('inquirer');
const Department = require('./js/department');
const Role = require('./js/role')


// CONNECT TO DATABASE
// ============================================================
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
      case "ADD department":
        addDept();
        break;
      case "ADD role":
        addRole();
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

// Add departments, roles, and employees.
function addDept() {
  inquirer.prompt({
    name: "name",
    type: "input",
    message: "What would you like to name this department? "
  }).then(function(answer) {
    const dept = new Department(answer.name);
    dept.add();
    mainMenu();
  })
}
function addRole() {

}
function addEmployee() {

}

// View departments, roles, and employees.
function viewDepts() {
  connection.query(`
  SELECT * FROM departments`,
  function(err, res) {
    console.table(res)
    mainMenu();
  })
}
function viewRoles() {

}
function viewEmployees() {

}
function viewEmpManager() {

}

// Delete departments, roles, and employees.
function deleteDept() {
    inquirer.prompt({
      name: "dept",
      type: "input",
      message: "Which department would you like to delete?",
    }).then(function(answer) {
      const dept = new Department(answer.dept);
      dept.delete();
      mainMenu();
  })
}
function deleteRole() {

}
function deleteEmp() {

}