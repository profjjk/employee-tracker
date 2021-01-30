-- Test departments --
INSERT INTO departments (department_name)
VALUES ("Administration");
INSERT INTO departments (department_name)
VALUES ("Accounting");
INSERT INTO departments (department_name)
VALUES ("Sales");
INSERT INTO departments (department_name)
VALUES ("Human Resources");
INSERT INTO departments (department_name)
VALUES ("Quality Control");
INSERT INTO departments (department_name)
VALUES ("Customer Relations");
INSERT INTO departments (department_name)
VALUES ("Logistics");

-- Test roles --
INSERT INTO roles (title, salary, department_id)
VALUES ("Branch Manager", "120000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", "80000", 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", "70000", 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Secretary", "40000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Customer Service Specialist", "50000", 6);
INSERT INTO roles (title, salary, department_id)
VALUES ("Quality Assurance Director", "60000", 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Human Resources Representative", "60000", 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Warehouse Foreman", "50000", 7);
INSERT INTO roles (title, salary, department_id)
VALUES ("Supplier Relations", "50000", 7);

-- Test employees --
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Dwight", "Schrute", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Pam", "Beesly", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Angela", "Martin", 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Kelly", "Kapoor", 5, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Creed", "Bratton", 6, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Toby", "Flenderson", 7, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Meredith", "Palmer", 9, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Daryll", "Philbin", 8, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Oscar", "Martinez", 3, 1);