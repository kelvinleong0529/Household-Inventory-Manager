// index.js is only for the setup of the server, we seperate the routing in another file
import usersRoutes from "./routes/user.js";

import express from "express";
import bodyParser from "body-parser"; // allows us to take in incoming post request bodies

// initialize the express application
const app = express();
const PORT = 5000;

// tell the app that we will be using JSON data in the app
// intialize the bodyParser middleware
app.use(bodyParser.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
  res.send("Testing from Homepage!");
});

// make our app listen for incoming requests
app.listen(PORT, () =>
  console.log(`Server running on port: http://localhost:${PORT}`)
);
