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
  constructor(firstName, lastName, roleID, managerID) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleID = roleID;
    this.managerID = managerID;
  }
  add() {
    connection.query(`
      INSERT INTO employees SET ?`,
      {
        first_name: `${this.firstName}`,
        last_name: `${this.lastName}`,
        role_id: `${this.roleID}`,
        manager_id: `${this.managerID}`
      },
      function(err, res) {
        if (err) throw err;
        console.log("Employee added.");
      }
    )
  }
}

class Role {
  constructor(title, salary, dept) {
    this.title = title;
    this.salary = salary;
    this.dept = dept;
  }
  add() {
    connection.query(`
      INSERT INTO roles SET ?`,
      {
        title: `${this.title}`,
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