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
          "select department.name AS name, department.id AS value from department",
          `%${answers.role}%`
        )
        console.log("pp2")
        return results;
      }
    }])
    .then(function (department) {
      var values = [rolename, roleSalary, deptName];
      console.log(values)
      server.query(`INSERT INTO rolee (title, salary, department_id) VALUES ('${rol.rolename}', '${roleSal.roleSalari}', '${department.deptName}')`, function (err, result) {
        if (err) throw err;
        log()
      })
    })
}








//DO SHIT

//ASK THE USERS STUFFS
console.log("pp3")
const addEmployees = async () => {
  const response = await inquirer.prompt([{
      type: "input",
      name: "firstName",
      message: ["What is the employee's first name? "]
    }, {
      type: "input",
      name: "Middle",
      message: ["What is the employee's middle name? "]
    }, {
      type: "input",
      name: "lastName",
      message: ["What is the employee's Last name? "]
    },

    ////////get data n set as options
    {
      name: "role",
      type: "list",
      message: ["What is the employee's role? "],
      choices: async function (answers) {
        const results = await queryPromise(
          "select rolee.title AS name, rolee.id AS value from rolee"
        );
        console.log("pp2")
        return results;
      }
    },
    {
      type: "list",
      name: "manger",
      message: ["Who is the manager of this employee? "],
      choices: async function (answers) {
        const results = await queryPromise(
          "select department.name AS name, department.id AS value from department WHERE name LIKE ?",
          `%${answers}%`
        );
        return results;
      }
    }
  ])
}
console.log("pp2")


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