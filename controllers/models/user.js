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
    const { userId } = request.params;

    const sqlStatement = `SELECT * FROM user_table_development WHERE userId = ($1)`;
    const sqlParams = [userId];
    const sqlResult = await pool.query(sqlStatement, sqlParams);

    // if SQL return 0 rows meaning the userId is invalid
    if (!sqlResult.rowCount) {
      response.status(404).send("Invalid userId!!");
    }
    response.send(sqlResult.rows[0]);
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = async (request, response) => {
  try {
    const { userId } = request.params;

    // Assertion to check if userid is valid
    const assertionSqlStatement = `SELECT * FROM user_table_development WHERE userId = ($1)`;
    const assertionSqlParams = [userId];
    const assrtionSqlResult = await pool.query(
      assertionSqlStatement,
      assertionSqlParams
    );

    if (!assrtionSqlResult.rowCount) {
      response.status(404).send("Invalid userId!!");
    }

    // SQL Delete Action
    const sqlStatement = `DELETE FROM user_table_development WHERE userId = $1`;
    const sqlParams = [userId];

    const sqlResult = await pool.query(sqlStatement, sqlParams);
    response.send(
      `User with userId: ${userId} has been deleted from the database!`
    );
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (request, response) => {
  try {
    const { firstName, lastName, age } = request.body;

    // ----------------------------------------------------------------------------------
    // Assertion to check if request body info submitted is legit
    // ----------------------------------------------------------------------------------
    // 1. Ensure firstName, lastName & age is PRESENT in the request body
    if (
      (firstName === undefined) |
      (lastName === undefined) |
      (age === undefined)
    ) {
      response
        .status(404)
        .send("Expect FIRSTNAME, LASTNAME & AGE from the request body!!");
    }

    // 2. Ensure the "firstName" length is not more than 255
    if (firstName.length > 255) {
      response
        .status(404)
        .send("First Name's length shouldn't be greater than 255!!");
    }

    // 3. Ensure the "lastName" length is not more than 255
    if (lastName.length > 255) {
      response
        .status(404)
        .send("Last Name's length shouldn't be greater than 255!!");
    }

    // 4. Ensure the "Age" is a INTEGER
    if (age !== parseInt(age, 10)) {
      response.status(404).send("Age should be an INTEGER!!");
    }

    // 5. Ensure the "Age" is greater than 0
    if (age <= 0) {
      response.send("Age must be greater than 0!!");
    }

    // ----------------------------------------------------------------------------------
    // End of Assertion
    // ----------------------------------------------------------------------------------

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
    const { userId } = request.params;
    const { firstName, lastName, age } = request.body;

    // Assertion to check if userid is valid
    const assertionSqlStatement = `SELECT * FROM user_table_development WHERE userId = ($1)`;
    const assertionSqlParams = [userId];
    const assrtionSqlResult = await pool.query(
      assertionSqlStatement,
      assertionSqlParams
    );

    if (!assrtionSqlResult.rowCount) {
      response.status(404).send("Invalid userId!!");
    }

    const sqlStatement = `UPDATE user_table_development SET firstname = $1, lastname = $2, age = $3 WHERE userId = $4`;
    const sqlParams = [firstName, lastName, age, userId];

    const sqlResult = await pool.query(sqlStatement, sqlParams);
    response.json(`User with userId: ${userId} has been updated!`);
  } catch (error) {
    console.error(error);
  }
};
