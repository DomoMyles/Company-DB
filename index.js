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
          "select department.name AS name, department.id as value from department",
        )
        console.log(results, answers)
        return results;
      }
    }])
    /////////send it to the mysql database
    .then(function (Answers) {
      server.query(`INSERT INTO role (title, salary, department_id) VALUES ('${Answers.rolename}', '${Answers.roleSalary}', '${Answers.deptName}')`, function (err, result) {
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
        console.log(answers)
        return results;
      }
    }])
    .then(function (Answers) {
      server.query(`INSERT INTO employeedb (first_name, last_name, role_id, manager_id) VALUES ('${Answers.firstName}', '${Answers.lastName}', '${Answers.role}', '${Answers.manger}')`, function (err, result) {
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
        console.log(results)
      }
    }])
    .then(function (Answers) {
      console.log(Answers)
      server.query(`UPDATE employeedb SET role_id = '${Answers.role}' WHERE id = ${Answers.Employe};`, function (err, result) {
        if (err) throw err;

        console.log("Updated Role")
        log()
      })
    })
}



//cyst.nat




/////DISPLAY EVERYTHING

function displayDepts() {
  server.query('SELECT * FROM company_db.department', function (err, results) {
    if (err) throw err
    console.table(results)
    log()
  })
}


// async function (Answers) {
//   const results = await queryPromise(
//     "select role.title AS name, role.id AS value from role",
//   )
//   return results;
//   console.log(results)
// }
// }])
// .then(function (Answers) {
// console.log(Answers)
// server.query(`UPDATE employeedb SET role_id = '${Answers.role}' WHERE id = ${Answers.Employe};`, function (err, result) {
//   if (err) throw err;
/////////////////////////////////////////////
// {
//  async function (Answers) {
//     const results = await queryPromise(
//       "select role.title AS name, role.id AS value from role",
//     )
//     return results;
//     console.log(results)
//   }
// }

//make a for loop???

async function displayRole(Go) {
  const varid = await queryPromise(
    'SELECT role.department_id as id FROM role',
  )
  console.table(varid)


  const varname = await queryPromise(
    `SELECT department.name as department WHERE department.id = '${varid.}' FROM department`
  )
    if (err) throw err
    console.table(results);
     console.log(varname);
      log()
  

}

function displayEmployees() {
  queryPromise("SELECT * FROM company_db.employeedb", function (err, results) {
    //"select role.title AS name, role.id AS value from role"
    if (err) throw err
    console.table('Several objects', results)
    log()
  })
}