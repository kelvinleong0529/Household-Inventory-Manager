import express from "express"

import { validateItem, createItemLimit, createItem } from "./routes/item/newItem";
import { validateUser, createUserLimit, createUser } from "./routes/user/newUser";

import { createUserCredentialsTable, createItemTable } from "./scripts/migrate";

// interfaces
import { getItem, getItemLimit } from "./routes/item/getItem";
import { validateApiKey } from "./authorization/validation";

const PORT: number = Number(process.env.PORT || 5000);
const app = express()

// create the tables needed
createUserCredentialsTable();
createItemTable();

// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/item", getItemLimit, validateApiKey, getItem);

app.post("/item", createItemLimit, validateApiKey, validateItem, createItem);

app.post("/create_user", createUserLimit, validateUser, createUser);

// app.delete("/users", async (req, res) => {
//     const user = await db("users").delete({ name: req.body.name }).returning("*");
//     res.json(user);
// });

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));