import { v4 as uuidv4 } from "uuid";

// for PostgreSQL connectivity
import { pool } from "../database/connectSever.js";

let users = [];

export const getUsers = async (req, res) => {
  try {
    const sqlStatement = `SELECT * FROM testing_user`;
    const sqlResult = await pool.query(sqlStatement);

    res.json(sqlResult.rows);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const sqlStatement = `SELECT * FROM testing_user WHERE user_id = ($1)`;
    const sqlParams = [id];
    const sqlResult = await pool.query(sqlStatement, sqlParams);

    res.json(sqlResult.rows);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const sqlStatement = `DELETE FROM testing_user WHERE user_id = $1`;
    const sqlParams = [id];

    const sqlResult = await pool.query(sqlStatement, sqlParams);
    res.send(`User with user_id: ${id} has been deleted from the database!`);
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, age } = req.body;

    const sqlStatement = `INSERT INTO testing_user (firstName, lastName, age) VALUES ($1,$2,$3) RETURNING *`;
    const sqlParams = [firstName, lastName, age];

    const sqlResult = await pool.query(sqlStatement, sqlParams);
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

    const sqlStatement = `UPDATE testing_user SET firstname = $1, lastname = $2, age = $3 WHERE user_id = $4`;
    const sqlParams = [firstName, lastName, age, id];

    const sqlResult = await pool.query(sqlStatement, sqlParams);
    res.json(`User with user_id: ${id} has been updated!`);
  } catch (error) {
    console.error(error);
  }
};
