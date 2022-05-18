import pg from "pg";

const { Pool } = pg;

interface Credentials {
    user: string,
    password: string,
    database: string,
    host: string,
    port: number
}

const credentials: Credentials = {
    user: "postgres",
    password: "Leong1246",
    database: "user_database",
    host: "localhost",
    port: 5432,
}

export const pool: pg.Pool = new Pool(credentials);
