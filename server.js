// index.js is only for the setup of the server, we seperate the routing in another file
import usersRoutes from "./routes/user.js";

import express from "express";
import bodyParser from "body-parser"; // allows us to take in incoming post request bodies

const app = express(); // initialize the express application
const PORT = 5000; // capital letters means it's a constant

// tell the app that we will be using JSON data in the app
app.use(bodyParser.json()); // intialize the bodyParser middleware

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Testing from Homepage!");
});

// make our app listen for incoming requests
app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
