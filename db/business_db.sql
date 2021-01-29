DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

USE business_db;

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employees;
SELECT * FROM roles;
SELECT * FROM departments;

-- Test employees --
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Kelly", 1, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("April", "Yang", 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Pascal", "Johnson", 4, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Sean", "McGuire", 3, 1);

-- Test roles --
INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", "250000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", "180000", 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", "120000", 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Clerk", "60000", 3);

-- Test departments --
INSERT INTO departments (name)
VALUES ("Engineering");
INSERT INTO departments (name)
VALUES ("Sales");
INSERT INTO departments (name)
VALUES ("Human Resources");