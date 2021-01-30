// DEPENDENCIES
// ============================================================
const connection = require('./js/connection');
const inquirer = require('inquirer');
const { Department, Employee, Role } = require('./js/classes');


// CONNECT TO DATABASE
// ============================================================
connection.connect(function(err) {
  if (err) throw err;
  console.log(`
  _______  __   __  _______      _______  _______  _______  ___   _______  _______ 
 |       ||  | |  ||       |    |       ||       ||       ||   | |       ||       |
 |_     _||  |_|  ||    ___|    |   _   ||    ___||    ___||   | |       ||    ___|
   |   |  |       ||   |___     |  | |  ||   |___ |   |___ |   | |       ||   |___ 
   |   |  |       ||    ___|    |  |_|  ||    ___||    ___||   | |      _||    ___|
   |   |  |   _   ||   |___     |       ||   |    |   |    |   | |     |_ |   |___ 
   |___|  |__| |__||_______|    |_______||___|    |___|    |___| |_______||_______|
   ________________________________________________________________________________`)
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
      "VIEW employees",
      "ADD employee",
      "DELETE employee",
      "VIEW departments",
      "ADD department",
      "DELETE department",
      "VIEW roles",
      "ADD role",
      "DELETE role",
      "UPDATE employee role", 
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
      case "UPDATE employee role":
        updateEmpRole();
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
  connection.query(`
  SELECT * FROM departments`,
  function(err, results) {
    if (err) throw err;
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
        type: "list",
        message: "What department will this role belong to? ",
        choices: function() {
          const depts = [];
          for (let i = 0; i < results.length; i++) {
            depts.push({ name: results[i].department_name, value: results[i].id });
          }
          return depts;
        }
      }
    ]).then(function(answers) {
      const role = new Role(answers.role, answers.salary, answers.dept);
      role.add();
      mainMenu();
    })
  })
}

function addEmployee() {
  connection.query(`
  SELECT * FROM employees
  JOIN roles ON employees.role_id = roles.id;`,
  function(err, results) {
    if (err) throw err;
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
        type: "list",
        message: "What is the new employee's role? ",
        choices: function() {
          const roles = [];
          for (let i = 0; i < results.length; i++) {
            roles.push({ name: results[i].title, value: results[i].role_id });
          }
          return roles;
        }
      },
      {
        name: "manager",
        type: "list",
        message: "Who is the new employee's manager? ",
        choices: function() {
          const managers = [];
          for (let i = 0; i < results.length; i++) {
            managers.push({ name: results[i].first_name + " " + results[i].last_name, value: results[i].id });
          }
          return managers;
        }
      },
    ]).then(function(answers) {
      const employee = new Employee(answers.firstName, answers.lastName, answers.role, answers.manager);
      employee.add();
      mainMenu()
    })
  })
}

// View departments, roles, and employees.
function viewDepts() {
  connection.query(`
  SELECT id AS ID, department_name AS Department 
  FROM departments`,
  function(err, res) {
    console.table(res)
    mainMenu();
  })
}
function viewRoles() {
  connection.query(`
  SELECT id AS ID, title AS Title, salary AS Salary, department_id AS 'Department ID' 
  FROM roles`,
  function(err, res) {
    console.table(res)
    mainMenu();
  })
}

function viewEmployees() {
  connection.query(`
  SELECT employees.id AS ID, CONCAT (first_name, ' ', last_name) AS Name, title AS Title, salary AS Salary, department_name AS Department, employees.manager_id AS 'Manager ID'
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
  connection.query(`SELECT id AS ID, CONCAT (first_name, ' ', last_name) AS Name FROM employees`,
  function(err, res) {
    if (err) throw err;
    console.table(res)
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

function updateEmpRole() {
  connection.query(`
  SELECT employees.id AS 'Employee ID', CONCAT (first_name, ' ', last_name) AS Name, title AS Title, roles.id AS 'Role ID' FROM employees
  JOIN roles 
    ON employees.role_id = roles.id`,
  function(err, res) {
    if (err) throw err;
    console.table(res)
    inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee's ID#?",
      },
      {
        name: "role",
        type: "input",
        message: "What is the employee's new role ID?",
      }
    ]).then(answer => {
      connection.query(`
      UPDATE employees
      SET role_id = ${parseInt(answer.role)}
      WHERE employees.id = ${parseInt(answer.id)}`,
      function(err, res) {
        if (err) {console.log("Employee not found.")}
        console.log("Employee updated.");
        mainMenu();
      })
    })
  })
}