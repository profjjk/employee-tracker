DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- Test departments --
INSERT INTO departments (department_name)
VALUES ("Management");
INSERT INTO departments (department_name)
VALUES ("Engineering");
INSERT INTO departments (department_name)
VALUES ("Sales");
INSERT INTO departments (department_name)
VALUES ("Human Resources");

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Test roles --
INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", "200000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", "160000", 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", "120000", 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Recruiter", "80000", 4);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Test employees --
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Kelly", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("April", "Yang", 1, null);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Pascal", "Johnson", 4, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sean", "McGuire", 3, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Jones", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Jackson", 2, 1);