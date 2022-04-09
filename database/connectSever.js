// const { Client } = require("pg");

import pg from "pg";

const { Pool } = pg;

const credentials = {
  user: "postgres",
  password: "Leong1246",
  database: "user_database",
  host: "localhost",
  port: 5432,
}

export const pool = new Pool(credentials);
