// installed requirements
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require("console.table");
const server = require('./db/connection');
const {
  callbackify
} = require('util');




// connects to mysql database
server.connect(function (err) {
  if (err) throw err;
  console.log('---Server Connected---');
  // add the function that starts that communicates with mysql
  log()
});
//work

function log() {
  inquirer.prompt([{
      type: "list",
      name: "command",
      message: 'Select an option below.',
      choices: [
        "View all Departments",
        "View all Roles",
        "View all employees",
        "Add Departments",
        "Add Role",
        "Add Employees",
        "Update Employee Role",
        "Quit"
      ]
    }, ])
    .then((res) => {
      console.log(res)
      if (res.command === 'View all Departments') {
        displayDepts()

      } else if (res.command === 'View all Roles') {
        displayRole()

      } else if (res.command === 'View all employees') {
        displayEmployees()

      } else if (res.command === 'Add Departments') {
        addDepts()

      } else if (res.command === 'Add Role') {
        addRoles()

      } else if (res.command === 'Add Employees') {
        addEmployees()

      } else if (res.command === 'Update Employee Role') {
        update()

      } else if (res.command === 'Quit') {
        quit()

      }
    })
}





//set the db and Query Promises for the following funcitons
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "School1442!",
    port: 3306,
    database: "company_db"
  },
  console.log(`---Connected to the database---`)
);

const queryPromise = (statement, params) => {
  return new Promise((resolve, reject) => {
    db.query(statement, params, (err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
}


//ADD DEPARTMENTS
function addDepts() {
  inquirer.prompt([{
      type: "input",
      name: "deptname",
      message: ["What is the name of the department? "]
    }])
    .then(function (depd) {
      server.query(`INSERT INTO department (name) VALUES ('${depd.deptname}')`, function (err) {
        if (err) throw err
        console.log("---Added department to database---")
        log()
      })
    })
}



//ADD ROLE
const addRoles = async () => {
  const response = await inquirer.prompt([{
      type: "input",
      name: "rolename",
      message: ["What is the name of the role? "]
    }, {
      type: "input",
      name: "roleSalary",
      message: ["What is the Salary of the role? "]
    }, {
      type: "list",
      name: "deptName",
      message: ["What department is this role under? "],
      choices: async function (answers) {
        const results = await queryPromise(
          "select department.name AS name, department.id as value from department",
        )
        return results;
      }
    }])
    //send to database
    .then(function (Answers) {
      server.query(`INSERT INTO role (title, salary, department_id) VALUES ('${Answers.rolename}', '${Answers.roleSalary}', '${Answers.deptName}')`, function (err, result) {
        if (err) throw err;
        console.log("---Added role to database---")
        log()
      })
    })
}



///add employees
const addEmployees = async () => {
  const response = await inquirer.prompt([{
      type: "input",
      name: "firstName",
      message: ["What is the employee's first name? "]
    }, {
      type: "input",
      name: "lastName",
      message: ["What is the employee's Last name? "]
    }, {
      type: "list",
      name: "role",
      message: ["What is the employee's role? "],

      choices: async function (answers) {
        const results = await queryPromise(
          "select role.title AS name, role.id AS value from role",
        )
        return results;
      }
    }, {
      type: "list",
      name: "manger",
      message: ["Who is the manager of this employee? "],
      choices: async function (answers) {
        const results = await queryPromise(
          "select employeedb.first_name AS name, employeedb.id AS value from employeedb",
          `%${answers.manager}%`
        );
        return results;
      }
    }])
    .then(function (Answers) {
      server.query(`INSERT INTO employeedb (first_name, last_name, role_id, manager_id) VALUES ('${Answers.firstName}', '${Answers.lastName}', '${Answers.role}', '${Answers.manger}')`, function (err, result) {
        if (err) throw err;
        console.log("---Added employee to database---")
        log()
      })
    })
};

















const update = async () => {
  const response = await inquirer.prompt([{
      type: "list",
      name: "Employe",
      message: ["Which employe's role do you want to update? "],
      choices: async function (Answers) {
        const results = await queryPromise(
          "select employeedb.first_name AS name, employeedb.id AS value from employeedb"
        )
        return results;
      }
    }, {
      type: "list",
      name: "role",
      message: ["What role do you want to assign the selected employee? "],

      choices: async function (Answers) {
        const results = await queryPromise(
          "select role.title AS name, role.id AS value from role",
        )
        return results;
      }
    }])
    .then(function (Answers) {
      server.query(`UPDATE employeedb SET role_id = '${Answers.role}' WHERE id = ${Answers.Employe};`, function (err, result) {
        if (err) throw err;

        console.log("---Updated Role---")
        log()
      })
    })
}



//cyst.nat




/////DISPLAY EVERYTHING
//display departments
function displayDepts() {
  server.query('SELECT * FROM company_db.department', function (err, results) {
    if (err) throw err
    console.table(results)
    log()
  })
}

//display role
async function displayRole() {
  const varid = await queryPromise(`SELECT role.id, role.title, department.name AS department, role.salary
                    FROM department
                    INNER JOIN role ON department.id=role.department_id `)
  console.table(varid)
  log()
}


//SEND STUFF TO THE EMPLOYEE DB
async function displayEmployees() {
  const employeTable = await queryPromise(`SELECT e.id,
                                                  e.first_name,
                                                  e.last_name,
                                                  role.title,
                                                  department.name AS department,
                                                  role.salary,
                                                  CONCAT(m.first_name, ' ', m.last_name) AS 'Manager',
                                                  e.first_name AS 'first_name'
                                                  FROM  employeedb e
                                                    INNER JOIN role
                                                      ON role.id = e.role_id
                                                    INNER JOIN employeedb m
                                                      ON m.id = e.manager_id
                                                    INNER JOIN department
                                                      ON department.id = role.department_id
`)
  console.table(employeTable)
  log()
}

function quit() {
  server.destroy();
  console.log('---Server Disonnected--- press ctrl + c to end') 

  
  // add the function that starts that communicates with mysql
}