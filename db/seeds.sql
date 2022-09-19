INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("Sales");
     

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 120000, 4),
       ("Salesperson", 90000, 4),
       ("Lead Engineer", 130000, 1),
       ("Software Engineer", 110000, 1),
       ("Account Manager", 190000, 2),       
       ("Accountant", 115000, 2),
       ("Legal Team Lead", 230000, 3),
       ("Lawyer", 170000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Mike", "Chan", 2, 1),
       ("Ashley", "Rodriguez", 3, NULL),
       ("Kevin", "Tupik", 4, 3),
       ("Kunal", "Singh", 5, NULL),
       ("Malia", "Brown", 6, 5),
       ("Sarah", "Lourd", 7, NULL),
       ("Tom", "Allens", 8, 7);