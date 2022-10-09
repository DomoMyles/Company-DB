const inquirer = require("inquirer");
const mysql = require('mysql2');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'root',
    database: 'movies_db'
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

const promptUser = async () => {
  const response = await inquirer.prompt([
    {
      name: "movie_filter",
      type: "input",
      message: "Enter a phrase to filter movies"
    },
    {
      name: "movie_id",
      type: "list",
      choices: async function (answers) {

        // const exampleResults = [
        //   {
        //     value: 1,
        //     name: "lord of the rings"
        //   },
        //   {
        //     value: 2,
        //     name: "the hobbit"
        //   },
        // ];

        const results = await queryPromise(
          "select movies.name AS name, movies.id AS value from movies WHERE name LIKE ?",
          `%${answers.movie_filter}%`
        );
        return results;
      }
    }
  ]);

  console.log(response);
  
  return response;
}

promptUser();


inquirer.prompt([{
    type: "input",
    name: "firstName",
    message: ["What is the employee's first name? "]
  }])
  .then(function (first_name) {
    inquirer.prompt([{
        type: "input",
        name: "lastName",
        message: ["What is the employee's Last name? "]
      }])
      .then(function (last_name) {
        inquirer.prompt([{
            type: "list",
            name: "role",
            message: ["What is the employee's role? "],
            choices: async function () {
              const results = await queryPromise("select department.name AS value, department.* AS name from department");
            }
          }])
          .then(function (role_id) {

            inquirer.prompt([{
                type: "list",
                name: "manger",
                message: ["Who is the manager of this employee? "],
                choices: async function (answers) {


                    var idCode = Math.floor(Math.random())

const queryPromise = (statement, params) => {
  return new Promise((resolve, reject) => {
    dn.query(statement, params, (err, result) => {
      if (err) {
        return reject(err);
      }
    })
  })
}
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "School1442!",
  port: 3306,
  database: "company_db"
})




////////////////

inquirer.prompt([{
    type: "input",
    name: "firstName",
    message: ["What is the employee's first name? "]
  }])
  .then(function (first_name) {
    inquirer.prompt([{
        type: "input",
        name: "lastName",
        message: ["What is the employee's Last name? "]
      }])
      .then(function (last_name) {
        inquirer.prompt([{
            type: "list",
            name: "role",
            message: ["What is the employee's role? "],
            choices: async function () {
              const results = await queryPromise("select department.name AS value, department.* AS name from department");
            }
          }])
          .then(function (role_id) {

            inquirer.prompt([{
                type: "list",
                name: "manger",
                message: ["Who is the manager of this employee? "],
                choices: async function (answers) {

                  const exampleResults = [{
                      value: 1,
                      name: "lord of the rings"
                    },
                    {
                      value: 2,
                      name: "the hobbit"
                    },
                  ];

                  const results = await queryPromise(
                    "select department.name AS name, department.id AS value from department WHERE name LIKE ?",
                    `%${answers.manger}%`
                  );
                  return results;
                }
              }])
              .then(function (manager) {

                var values = [id, first_name, last_name, role_id, manager];
                console.log(values);
                server.query(`INSERT INTO id 
                              (id, first_name, last_name, role_id, manager_id)
                              VALUES ('${id.idCode}'
                                      '${first_name.firstName}',
                                      '${last_name.lastName}',
                                      '${role_id.role}',
                                      '${manager.manger}')`,
                  function (err, result) {

                    if (err) throw err;
                    log()

                  })
              })
          })
      })
  })


  ///ADD USERS
const promptUser = async () => {
    const response = await inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: ["What is the employee's first name? "]
      },
      {
        name: "user Choice",
        type: "input",
  
        choices: async function () {
          const results = await quetyPromise("select department.name AS value, department.* AS name from department");
        }
      }
    ])
    console.log(results)
    console.log("pp")
  }


  











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
          "select department.name AS name, department.id
           AS value from department WHERE name LIKE ?",
          `%${answers}%`
        );
        return results;
      }
    }])
  }
  console.log("pp2")