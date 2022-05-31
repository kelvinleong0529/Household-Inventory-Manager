import { db } from "../db";

// table to store user credentials
export const createUserCredentialsTable = async () => {
    try {
        await db.schema.dropTableIfExists("users_credentials");
        await db.schema.withSchema("public").createTable("users_credentials", (table) => {
            table.increments('id').primary();
            table.string("email", 255).notNullable().unique();
            table.string("password", 255).notNullable();
            table.string("apiKey");
            table.timestamps(true, true);
        });
        console.log("Created users-credentials table!");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

// table to store user inventory / items
export const createUserTable = async () => {
    try {
        await db.schema.dropTableIfExists("users");
        await db.schema.withSchema("public").createTable("users", (table) => {
            table.increments('id');
            table.integer("user_id").references("id").inTable("users_credentials");
            table.string("category", 255);
            table.string("name", 255);
            table.integer("current_quantity");
            table.integer("alert_quantity");
            table.date("expiry_date");
            table.timestamps(true, true);
        });
        console.log("Created users table!");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
