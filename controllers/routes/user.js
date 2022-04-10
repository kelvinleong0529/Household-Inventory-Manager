import express from "express";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../models/user.js";

// REQ PARAMS are fed into the url, while REQ BODY are the info fed in JSON
// browsers can only make GET requests
// all routes in here are starting with /users
const router = express.Router();

router.get("/", getUsers);

// when we put the semicolon sign, we are expecting anything after the user's path
router.get("/:userId", getUser);

router.delete("/:userId", deleteUser);

router.post("/", createUser);

router.patch("/:userId", updateUser);

export default router;
