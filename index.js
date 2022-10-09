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
  console.log('Server Connected');
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
        display()

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
  console.log(`Connected to the movies_db database.`)
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
        console.log("Added to departments")
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
          "select department.name value from department",
          `%${answers.role}%`
        )
        return results;
      }
    }])
    /////////send it to the mysql database
    .then(function (Answers) {
      server.query(`INSERT INTO rolee (title, salary, department) VALUES ('${Answers.rolename}', '${Answers.roleSalary}', '${Answers.deptName}')`, function (err, result) {
        if (err) throw err;
        console.log("---Added role---")
        log()
      })
    })
}



///add exmployeees
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
          "select rolee.title AS name from rolee",
          `%${answers.role}%`
        )
        return results;
      }
    }, {
      type: "list",
      name: "manger",
      message: ["Who is the manager of this employee? "],
      choices: async function (answers) {
        const results = await queryPromise(
          "select id.first_name AS value, id.first_name AS name from id WHERE role_id REGEXP 'manager'",
          `%${answers.manager}%`
        );
        console.log(answers)
        return results;
      }
    }])
    .then(function (Answers) {
      server.query(`INSERT INTO id (first_name, last_name, role_id, manager_id) VALUES ('${Answers.firstName}', '${Answers.lastName}', '${Answers.role}', '${Answers.manger}')`, function (err, result) {
        if (err) throw err;
        console.log("Added role")
        log()
      })
    })
};

















const update = async () => {
  const response = await inquirer.prompt([{
    type: "list",
    name: "Employe",
    message: ["Which employe's role do you want to update? "],
    choices: async function (Employe) {
      const results = await queryPromise(
        "select id.first_name AS name from id"
      )
      console.log(Employe)
      return results;
    }
  }, {
    type: "list",
    name: "role",
    message: ["What role do you want to assign the selected employee? "],

    choices: async function (answers) {
      const results = await queryPromise(
        "select rolee.title AS name from rolee",
        `%${answers.role}%`
      )
      console.log("Updated Employee's role")
      return results;
    }
  }])
  log()
}



//cyst.nat

//add employees

//set up replace function
function pingas() {
  var obej = "four"
  //grab stuff from mysql
  const result = ""
  const choi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "School1442!",
    port: 3306,
    database: "company_db"
  })
  //set variables from the name column in department db to a sting named results
  console.log("connected to sql")
  var results = []
  choi.query('SELECT name FROM department', function (err, results) {
      console.log(results)
      //set a variable to be set to each output from that table
      let obj = {}

      for (let i = 0; i < results.length; i++) {
        obj["counter" + i] = results[i]
      }
      let {
        counter0,
        counter1,
        counter2
      } = obj;
      console.log("here")
      console.log(counter0, counter1, counter2);
      console.log(obj)
      obej = objy
      if (err) throw err
    })
    .then

  inquirer.prompt([{

      type: "list",
      name: "employe",
      message: ["What is the employee you want to switch roles of? "],
      choices: ["employee"]
    }])
    .then(function (employ) {
      inquirer.prompt([{
          type: "list",
          name: "role",
          message: ["What role would you like them to be? "],
          choices: obej
        }])
        .then(function (rolee) {
          console.log(rolee)
        })
    })

}




/////DISPLAY EVERYTHING

function displayDepts() {
  server.query('SELECT * FROM company_db.department', function (err, results) {

    if (err) throw err
    console.table(results)
    log()
  })
}

function displayRole() {
  server.query('SELECT * FROM company_db.rolee', function (err, results) {

    if (err) throw err
    console.table('Several objects', results);
    log()
  })
}

function displayEmployees() {
  server.query('SELECT * FROM company_db.id', function (err, results) {

    if (err) throw err
    console.table('Several objects', results)
    log()
  })
}