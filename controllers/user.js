import { v4 as uuidv4 } from "uuid";

// for PostgreSQL connectivity
import { pool } from "../database/connectSever.js";

let users = [];

export const getUsers = async (req, res) => {
  try {
    const sqlText = `SELECT * FROM testing_user`;
    const sqlResult = await pool.query(sqlText);

    res.json(sqlResult.rows);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const sqlText = `SELECT * FROM testing_user WHERE user_id = ($1)`;
    const sqlParams = [id];
    const sqlResult = await pool.query(sqlText, sqlParams);

    res.json(sqlResult.rows);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  // filter function keeps whatever element that is returned TRUE
  users = users.filter((user) => user.id !== id);

  res.send(`User with id ${id} has been deleted from database!`);
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, age } = req.body;

    // for SQL query
    const sqlText = `INSERT INTO testing_user (firstName, lastName, age) VALUES ($1,$2,$3) RETURNING *`;
    const sqlParams = [firstName, lastName, age];

    const sqlResult = await pool.query(sqlText, sqlParams);
    res.json(
      `User with the name ${firstName} below has been added to the database!`
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    // SQL update query text
    const sqlText = `UPDATE testing_user SET firstname = $1, lastname = $2, age = $3 WHERE user_id = $4`;
    const sqlParams = [firstName, lastName, age, id];

    const sqlResult = await pool.query(sqlText, sqlParams);
    res.json(`User with user_id: ${id} has been updated!`);
  } catch (error) {
    console.error(error);
  }
  // const { id } = req.params;

  // // destructure the body contents that we get from the request body
  // // only need to include the info / part that need to be updated in the JSON body of the PATCH request
  // const { firstName, lastName, age } = req.body;

  // const user = users.find((user) => user.id === id);

  // if (firstName) user.firstName = firstName;
  // if (lastName) user.lastName = lastName;
  // if (age) user.age = age;

  // res.send(`User with the id ${id} has been updated!`);
};
