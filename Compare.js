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
        console.log("added to dept")
        log()
      })
    })
}

//ADD ROLE FOR DEPARTMENT
function addRoles() {
  inquirer.prompt([{
      type: "input",
      name: "rolename",
      message: ["What is the name of the role? "]
    }])
    .then(function Send1(role) {

      inquirer.prompt([{
          type: "input",
          name: "roleSalary",
          message: ["What is the Salary of the role? "]
        }])
        //DO THE SALARY ONE
        .then(function (roleSalary) {
          server.query(`INSERT INTO role (salary) VALUES ('${roleSalary.salary}')`, function (err) {
            if (err) throw err
            log()
          })
        })

    })
}


function send1(role) {
  server.query(`INSERT INTO role (title) VALUES ('${role.rolename}')`, function (err) {
    if (err) throw err
  })
}








.then(function (role) {
  server.query(`INSERT INTO role (title) VALUES ('${role.rolename}')`, function (err) {
    if (err) throw err
    inquirer.prompt([{
        type: "input",
        name: "roleSalary",
        message: ["What is the Salary of the role? "]
      }])
      //DO THE SALARY ONE
      .then(function (roleSalary) {
        server.query(`INSERT INTO role (salary) VALUES ('${roleSalary.salary}')`, function (err) {
          if (err) throw err
          log()
        })
      })

  })
})






function addRoles() {
  inquirer.prompt([{
      type: "input",
      name: "rolename",
      message: ["What is the name of the role? "]
    }])
    .then(function (role) {
        server.query(`INSERT INTO role (title) VALUES ('${role.rolename}')`, function (err) {
            if (err) throw err;
          }
        }) inquirer.prompt([{
        type: "input",
        name: "roleSalary",
        message: ["What is the Salary of the role? "]
      }])
      //DO THE SALARY ONE
      .then(function (roleSalary) {
        server.query(`INSERT INTO role (salary) VALUES ('${roleSalary.salary}')`, function (err) {
          if (err) throw err
          log()
        })
      })

    }