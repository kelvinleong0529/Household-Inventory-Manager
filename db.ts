import Knex from "knex";

export const db = Knex({
    client: "postgres",
    connection: {
        // docker container is going to look for the 'db' image address and replace it for below
        host: process.env.POSTGRES_HOST || "localhost",
        user: "postgres",
        password: "Leong1246",
        database: "postgres",
        // user: process.env.POSTGRES_HOST ? "docker-testing" : "postgres",
        // password: process.env.POSTGRES_HOST ? "123456" : "Leong1246",
        // database: process.env.POSTGRES_HOST ? "docker-testing" : "postgres",
    },
})