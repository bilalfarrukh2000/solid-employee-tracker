
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

