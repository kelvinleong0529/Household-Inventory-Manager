const knex = require("knex");

module.exports = knex({
  client: "postgres",
  connection: {
    // docker container is going to look for the 'db' image address and replace it for below
    host: process.env.POSTGRES_HOST || "localhost",
    user: "docker-testing",
    password: "123456",
    database: "docker-testing",
  },
});

// module.exports = knex({
//   client: "postgres",
//   connection: {
//     host: "localhost",
//     user: "zhins",
//     password: "secret",
//     database: "zhins",
//   },
// });
