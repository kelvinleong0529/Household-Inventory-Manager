import express from "express"

import { validatePost, createPostLimit, createPost } from "./routes/user/new_item";
import { validateUser, createUserLimit, createUser } from "./routes/user/new_user";

const PORT: number = Number(process.env.PORT || 5000);
const app = express()

import { db } from "./db"

// table to store user credentials
(async () => {
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
})();

// table to store user inventory / items
(async () => {
    try {
        await db.schema.dropTableIfExists("users");
        await db.schema.withSchema("public").createTable("users", (table) => {
            table.increments('id');
            table.integer("user_id").references("id").inTable("users_credentials");
            table.string("name", 255).notNullable();
            table.string("country", 255);
            table.integer("age");
            table.timestamps(true, true);
        });
        console.log("Created users table!");
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();

interface QueryUser {
    id: string
    name: string
    country: string
    age: number
}

// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    const queryUser: QueryUser = {
        id: req.body.id,
        name: req.body.name,
        country: req.body.country,
        age: req.body.age
    }
    const users = await db.select().where({ id: queryUser["id"] }).from("users");
    res.json(users);
});

app.post("/users", createPostLimit, validatePost, createPost);

app.post("/create_user", createUserLimit, validateUser, createUser);

// app.delete("/users", async (req, res) => {
//     const user = await db("users").delete({ name: req.body.name }).returning("*");
//     res.json(user);
// });

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));