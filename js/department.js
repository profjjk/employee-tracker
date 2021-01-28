const connection = require('./../connection')

class Department {
  constructor(name) {
    this.name = name
  }
  add() {
    connection.query(`
      INSERT INTO departments SET ?`,
      {
        name: `${this.name}`
      },
      function(err, res) {
        if (err) throw err;
        console.log("Department added.");
      }
    )
  }
  delete() {
    connection.query(`
      DELETE FROM departments
      WHERE name LIKE '${this.name}'`,
      function(err, res) {
        if (err) throw err;
        console.log("Department deleted.");
      }
    )
  }
}

module.exports = Department;