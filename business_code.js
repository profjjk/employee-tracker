// DEPENDENCIES
// ============================================================
const connection = require('./connection');
const inquirer = require('inquirer');
const { Department, Employee, Role } = require('./js/classes');
const Table = require('cli-table');


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
  inquirer.prompt([
    {
      name: "role",
      type: "input",
      message: "What is the title of role you would like to add? "
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this role? "
    },
    {
      name: "dept",
      type: "input",
      message: "What department will this role belong to? "
    }
  ]).then(function(answers) {
    const role = new Role(answers.role, answers.salary, answers.dept);
    role.add();
    mainMenu();
  })
}
function addEmployee() {
    inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the new employee's first name? "
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the new employee's last name? "
      },
      {
        name: "role",
        type: "input",
        message: "What is the new employee's role ID? ",
      },
      {
        name: "manager",
        type: "input",
        message: "What is the new employee's manager's ID? ",
      },
    ]).then(function(answers) {
      const employee = new Employee(answers.firstName, answers.lastName, answers.role, answers.manager);
      employee.add();
      mainMenu()
    })
}

// View departments, roles, and employees.
function viewDepts() {
  connection.query(`
  SELECT department_name AS Department 
  FROM departments`,
  function(err, res) {
    console.table(res)
    mainMenu();
  })
}
function viewRoles() {
  connection.query(`
  SELECT title AS Title, salary AS Salary, department_id AS 'Department ID' 
  FROM roles`,
  function(err, res) {
    console.table(res)
    mainMenu();
  })
}

function viewEmployees() {
  connection.query(`
  SELECT employees.id AS ID, first_name AS 'First Name', last_name AS 'Last Name', title AS Title, salary AS Salary, department_name AS Department, employees.manager_id AS 'Manager ID'
  FROM employees
  JOIN roles 
    ON employees.role_id = roles.id 
  JOIN departments
    ON roles.department_id = departments.id
  `,
  function(err, res) {
    console.table(res);
    mainMenu();
  })
}

function viewEmpManager() {
  inquirer.prompt({
    name: "manager",
    type: "input",
    message: "Enter the manager's ID# to see employees: "
  }).then(function(answer) {
    connection.query(`
    SELECT first_name AS 'First Name', last_name AS 'Last Name'
    FROM employees
    WHERE manager_id = ${answer.manager}`,
    function(err, res) {
      console.table(res);
    })
  })
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
  inquirer.prompt({
    name: "role",
    type: "input",
    message: "Which role would you like to delete?",
  }).then(function(answer) {
    const role = new Role(answer.role);
    role.delete();
    mainMenu();
  })
}
function deleteEmp() {
  inquirer.prompt({
    name: "employee",
    type: "input",
    message: "Which employee would you like to delete?",
  }).then(function(answer) {
    const employee = new Employee(answer.employee);
    employee.delete();
    mainMenu();
  })
}