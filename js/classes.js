const connection = require('./connection')

class Department {
  constructor(name) {
    this.name = name
  }
  add() {
    connection.query(`
      INSERT INTO departments SET ?`,
      {
        department_name: `${this.name}`
      },
      function(err, res) {
        if (err) throw err;
        console.log("Department added.");
      }
    )
  }
}

class Employee {
  constructor(firstName, lastName, roleID, manager) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleID = roleID;
    this.manager = manager;
  }
  add() {
    connection.query(`
      INSERT INTO employees SET ?`,
      {
        first_name: `${this.firstName}`,
        last_name: `${this.lastName}`,
        role_id: `${this.roleID}`,
        manager_id: getManager(this.manager),
        // manager_id: `${this.manager}`
      },
      function(err, res) {
        if (err) throw err;
        console.log("Employee added.");
      }
    )
  }
  
}

function getManager(manager) {
  connection.query(`
  SELECT id FROM employees
  WHERE CONCAT (first_name, ' ', last_name) LIKE '${manager}'`,
  function(err, result) {
    if (err) throw err;
    return result
  })
}

class Role {
  constructor(roleID, salary, dept) {
    this.roleID = roleID;
    this.salary = salary;
    this.dept = dept;
  }
  add() {
    connection.query(`
      INSERT INTO roles SET ?`,
      {
        roleID: `${this.roleID}`,
        salary: `${this.salary}`,
        department_id: `${this.dept}`
      },
      function(err, res) {
        if (err) throw err;
        console.log("Role added.");
      }
    )
  }
}

module.exports = { Department, Role, Employee };