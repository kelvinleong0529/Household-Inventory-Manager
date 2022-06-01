import { db } from "../db";

// table to store user credentials
export const createUserCredentialsTable = async () => {
    try {
        await db.schema.dropTableIfExists("user_credentials");
        await db.schema.withSchema("public").createTable("user_credentials", (table) => {
            table.increments('id').primary();
            table.string("email", 255).notNullable().unique();
            table.string("password", 255).notNullable();
            table.string("apiKey");
            table.timestamps(true, true);
        });
        console.log("Created user-credentials table!");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

// table to store user inventory / items
export const createItemTable = async () => {
    try {
        await db.schema.dropTableIfExists("item");
        await db.schema.withSchema("public").createTable("item", (table) => {
            table.increments('id');
            table.integer("user_id").references("id").inTable("user_credentials");
            table.string("item_name", 255).notNullable();
            table.string("item_category", 255);
            table.integer("current_quantity").notNullable();
            table.integer("alert_quantity");
            table.date("expiry_date");
            table.timestamps(true, true);
        });
        console.log("Created item table!");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
