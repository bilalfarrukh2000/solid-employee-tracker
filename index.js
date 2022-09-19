
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


function addRole(){
  var DEPARTMENTS=[];
 connect.query("SELECT name FROM department", function (err, result) {
    if (err) throw err;

    for (var i=0;i<result.length;i++){
    DEPARTMENTS.push(result[i].name);
    }
  });
  const questionsAddRole=[
    {
      type: 'input',
      name: 'roleName',
      message: "Enter the name of the role",
    },
    {
      type: 'input',
      name: 'rolesalary',
      message: "Enter the salary of the role",
    },
    {
      type: 'list',
      name: 'roleDept',
      message: "Enter the department of the role",
      choices: DEPARTMENTS
    },
  ];

  return inquirer.prompt(questionsAddRole).then((answers) => {
    connect.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleName}','${answers.rolesalary}','${DEPARTMENTS.indexOf(answers.roleDept)+1}')`)
        .then(([rows,fields]) => {
        console.log("Added successfully");
        })
        .then(showAnswers);
        })
  
}
function employeeUpdate () {
    var roles=[];
    var employeeNames=[];
    var employeeId=[];
    var qUpdateEmployee=[];
  
    var newRoleID;
    var employeeIdx;
  
   connect.promise().query("SELECT title FROM role")
      .then(([result,fields])=> {
        for (var i=0;i<result.length;i++){
          roles.push(result[i].title);
          }
        return roles;
        })
   connect.promise().query("SELECT first_name, last_name, role_id FROM employee")
      .then(([result,fields])=> {
          for (var i=0;i<result.length;i++){
          employeeId.push(result[i].role_id);
          employeeNames.push(result[i].first_name+" "+result[i].last_name);
          }
        return employeeNames;
      })
      .then( () => {
      qUpdateEmployee=[
        {
          type: 'list',
          name: 'selectEmployee',
          message: "Which Employee do you want to update?",
          choices: employeeNames
        },
        {
          type: 'list',
          name: 'newRole',
          message: "Enter the new role of the employee",
          choices: roles
        },
      ];
      return (qUpdateEmployee);
     })
  
     .then ( ()=>{
  
        
        inquirer.prompt(qUpdateEmployee).then((answers) => {
          newRoleID=roles.indexOf(answers.newRole)+1;
          employeeIdx=employeeNames.indexOf(answers.selectEmployee)+1;
       connect.promise().query(`UPDATE employee SET role_id='${newRoleID}' WHERE id='${employeeIdx}'`)
          .then(([rows,fields]) => {
            console.log("Added successfully");
          })
            .then(showAnswers);
  
        })
  
      })
   
      
  }


//Being

showAnswers();