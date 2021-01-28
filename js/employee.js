const connection = require('./../connection');

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
  delete() {
    connection.query(`
      DELETE FROM employees
      WHERE name LIKE '${this.firstName}' AND '${this.lastName}'`,
      function(err, res) {
        if (err) {
          console.log("No employee found by that name.")
        } else {
          console.log("Employee deleted.")
        }
      }
    )
  }
  updateManager(employeeID, managerID) {
    connection.query(`
      UPDATE employees SET ?`,
      {
        manager_id: `${managerID}`
      },
      `WHERE employees.id = ${employeeID}`,
      function(err, res) {
        if (err) {
          console.log("No matches found for the IDs provided");
        } else {
          console.log("The manager has been updated for that employee");
        }
      }
    )
  }
}

module.exports = Employee;