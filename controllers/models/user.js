// for PostgreSQL connectivity
import { pool } from "../../database/connectSever.js";

export const getUsers = async (request, response) => {
  try {
    const sqlStatement = `SELECT * FROM user_table_development`;
    const sqlResult = await pool.query(sqlStatement);

    response.send(sqlResult.rows);
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async (request, response) => {
  try {
    const { id } = request.params;

    const sqlStatement = `SELECT * FROM user_table_development WHERE userId = ($1)`;
    const sqlParams = [id];
    const sqlResult = await pool.query(sqlStatement, sqlParams);

    response.json(sqlResult.rows);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;

    const sqlStatement = `DELETE FROM user_table_development WHERE userId = $1`;
    const sqlParams = [id];

    const sqlResult = await pool.query(sqlStatement, sqlParams);
    response.send(
      `User with userId: ${id} has been deleted from the database!`
    );
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (request, response) => {
  try {
    const { firstName, lastName, age } = request.body;

    if (
      (firstName === undefined) |
      (lastName === undefined) |
      (age === undefined)
    ) {
      response.send("Expect FIRSTNAME, LASTNAME & AGE from the request body!!");
    }

    const sqlStatement = `INSERT INTO user_table_development (firstName, lastName, age) VALUES ($1,$2,$3) RETURNING *`;
    const sqlParams = [firstName, lastName, age];

    const sqlResult = await pool.query(sqlStatement, sqlParams);
    response.json(
      `User with the name ${firstName} has been added to the database!`
    );
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { firstName, lastName, age } = request.body;

    const sqlStatement = `UPDATE user_table_development SET firstname = $1, lastname = $2, age = $3 WHERE userId = $4`;
    const sqlParams = [firstName, lastName, age, id];

    const sqlResult = await pool.query(sqlStatement, sqlParams);
    response.json(`User with userId: ${id} has been updated!`);
  } catch (error) {
    console.error(error);
  }
};
