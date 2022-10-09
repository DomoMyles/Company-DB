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
              const results = await queryPromise(
                "select department.name AS value, department.* AS name from department");
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






./valheim_server.x86_64 
-nographics 
-batchmode 
-name "${SERVER_NAME}" 
-port ${SERVER_PORT} 
-world "${WORLD}" 
-password "${PASSWORD}" 
-public ${PUBLIC} 
> >(sed -uE "${FILTER}")

export templdpath=$LD_LIBRARY_PATH;
 export DOORSTOP_ENABLE=TRUE;
 export DOORSTOP_INVOKE_DLL_PATH=./BepInEx/core/BepInEx.Preloader.dll;
 export DOORSTOP_CORLIB_OVERRIDE_PATH=./unstripped_corlib;
 export LD_LIBRARY_PATH=./doorstop_libs:$LD_LIBRARY_PATH;
 export LD_PRELOAD=libdoorstop_x64.so:$LD_PRELOAD;
 export LD_LIBRARY_PATH=./linux64:$LD_LIBRARY_PATH;
 export SteamAppId=892970;

 ./valheim_server.x86_64 
 -nographics 
 -batchmode 
 -name "My Server" 
 -port 25629 
 -world "Dedicated" 
 -password "secret" 
 -public ${PUBLIC} > >(sed 
  -uE "[hidden]") & trap "[hidden]" 15;
 wait $!



 o
7ff9344aa000-7ff9344ab000 rw-p 00000000 00:00 0 
7ffe57792000-7ffe5779a000 ---p 00000000 00:00 0 
7ffe57f70000-7ffe57f91000 rw-p 00000000 00:00 0                          [stack]
7ffe57fa2000-7ffe57fa6000 r--p 00000000 00:00 0                          [vvar]
7ffe57fa6000-7ffe57fa8000 r-xp 00000000 00:00 0                          [vdso]
Native stacktrace:
/entrypoint.sh: line 36:    39 Segmentation fault      (core dumped) ./valheim_server.x86_64 -nographics -batchmode -name "${SERVER_NAME}" -port ${SERVER_PORT} -world "${WORLD}" -password "${PASSWORD}" -public ${PUBLIC} > >(sed -uE "${FILTER}")
container@pterodactyl~ Server marked as offline...
[Pterodactyl Daemon]: ---------- Detected server process in a crashed state! ----------
[Pterodactyl Daemon]: Exit code: 139
[Pterodactyl Daemon]: Out of memory: false
[Pterodactyl Daemon]: Updating process configuration files...
[Pterodactyl Daemon]: Ensuring file permissions are set correctly, this could take a few seconds...
container@pterodactyl~ Server marked as starting...
[Pterodactyl Daemon]: Pulling Docker container image, this could take a few minutes to complete...
[Pterodactyl Daemon]: Finished pulling Docker container image

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




  {
    type: "list",
    name: "managerName",
    message: ["Who will be the manager of this role "],
    choices: async function (answers) {
      const results = await queryPromise(
        "select id.first_name AS name, id.role_id AS value from id WHERE role_id LIKE 3",
        `%${answers.first_name}%`
      );
      console.log("pp2")
      return results;
    }
  }