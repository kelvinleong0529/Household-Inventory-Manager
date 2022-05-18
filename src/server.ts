// index.js is only for the setup of the server, we seperate the routing in another file
import router from "./controllers/routes/user";

import express, { Request, Response } from "express";
import bodyParser from "body-parser"; // allows us to take in incoming post request bodies

// initialize the express server
const server = express();
const PORT: number = Number(process.env.PORT ?? 5000);

// tell the server that we will be using JSON data
// intialize the bodyParser middleware
server.use(bodyParser.json());

server.use("/api/users", router);

server.get("/", (req: Request, res: Response): void => {
    res.send("Hello from Homepage!");
});

// make our server listen for incoming requests
server.listen(PORT, () =>
    console.log(`Server running on port: http://localhost:${PORT}`)
);

export default server;
