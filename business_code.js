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
        deleteEmployee();
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
    mainMenu();
  })
}

// DELETE
function deleteDept() {
  connection.query(`SELECT * FROM departments`,
  function(err, results) {
    if (err) throw err;
    inquirer.prompt({
      name: "choice",
      type: "list",
      message: "Which department would you like to delete?",
      choices: function() {
        const departments = [];
        for (let i = 0; i < results.length; i++) {
          departments.push(results[i].department_name);
        }
        return departments;
      }
    }).then(answer => {
      connection.query(`
      DELETE FROM departments
      WHERE department_name LIKE '${answer.choice}'`,
      function(err, res) {
        console.log("Department deleted.");
      })
      mainMenu();
    })
  })
}

function deleteRole() {
  connection.query(`SELECT * FROM roles`,
  function(err, results) {
    if (err) throw err;
    inquirer.prompt({
      name: "choice",
      type: "list",
      message: "Which role would you like to delete?",
      choices: function() {
        const roles = [];
        for (let i = 0; i < results.length; i++) {
          roles.push(results[i].title);
        }
        return roles;
      }
    }).then(answer => {
      connection.query(`
      DELETE FROM roles
      WHERE title LIKE '${answer.choice}'`,
      function(err, res) {
        console.log("Role deleted.");
      })
      mainMenu();
    })
  })
}
 
function deleteEmployee() {
  connection.query(`SELECT * FROM employees`,
  function(err, results) {
    if (err) throw err;
    inquirer.prompt({
      name: "id",
      type: "input",
      message: "What is the employee's ID#?",
    }).then(answer => {
      connection.query(`
      DELETE FROM employees
      WHERE id = ${parseInt(answer.id)}`,
      function(err, res) {
        if (err) {console.log("Employee not found.")}
        console.log("Employee deleted.");
      })
      mainMenu();
    })
  })
}
