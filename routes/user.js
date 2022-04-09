import express from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";

// REQ PARAMS are fed into the url, while REQ BODY are the info fed in JSON
// browsers can only make GET requests
const router = express.Router();

// all routes in here are starting with /users
router.get("/", getUsers);

// when we put the semicolon sign, we are expecting anything after the user's path
router.get("/:id", getUser);

router.delete("/:id", deleteUser);

router.post("/", createUser);

router.patch("/:id", updateUser);

export default router;
