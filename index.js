
const Table = require('console.table');
const inquirer = require('inquirer');
const mysql = require('mysql2');


const connect = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'Spidermanning123',
    database: 'employee_db'
  },
  console.log(`employee_db database is active.`)
);

const menu=[
  {
    type: 'list',
    name: 'options',
    message: "Select an option?",
    choices: ['View All Employees',
  'Add Employee',
  'Update Employee Role',
  'View All roles',
  'Add Role',
  'View All Departments',
  'Add Department',
  'Exit']
  },
];
