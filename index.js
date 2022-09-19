
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

function showAnswers() {

  return inquirer.prompt(menu).then((answers) => {

    

   idx=menu[0].choices.indexOf(answers.options);
   
   if (idx==0)
    showEmployee();
   else if (idx==1)
    addEmployee();
   else if (idx==2)
    employeeUpdate();
   else if (idx==3)
    showroles();
   else if (idx==4)
    addRole();
   else if(idx==5)
    showDepartment()
   else if (idx==6)
    addDepartment();
   else
    return;

 });
}


function showEmployee(){

 connect.promise().query('SELECT * FROM employee')
  .then(([rows,fields]) => {
    console.table(rows);
  })
  .then(showAnswers);
  
}

function showDepartment(){

 connect.promise().query('SELECT * FROM department')
    .then(([rows,fields]) => {
      console.table(rows);
    })
    .then(showAnswers);
    
}

function showroles(){

 connect.promise().query('SELECT * FROM role')
  .then(([rows,fields]) => {
    console.table(rows);
  })
  .then(showAnswers);
  
}





 

//Being

showAnswers();