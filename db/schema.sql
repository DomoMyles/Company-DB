CREATE DATABASE company_db;

USE company_db;

CREATE TABLE rolee (
    id INT AUTO_INCREMENT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE department (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);



CREATE TABLE id (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT 
);

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