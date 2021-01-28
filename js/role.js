const connection = require('./../connection');

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
        dept: `${this.dept}`
      },
      function(err, res) {
        if (err) throw err;
        console.log("Role added.");
      }
    )
  }
  delete() {
    connection.query(`
      DELETE FROM roles
      WHERE title LIKE '${this.title}'`,
      function(err, res) {
        if (err) {
          console.log("No role found by that name.")
        } else {
          console.log("Role deleted");
        }
      }
    )
  }
}

module.exports = Role;