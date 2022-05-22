// for PostgreSQL connectivity
import { pool } from "../../database/connectServer";
import ValidateUserApiSchema from "../../validation/user-Api-Schema.js";
import redis, { RedisClientType } from "redis";
import { RedisSearchLanguages } from "@node-redis/search/dist/commands";
import res from "express/lib/res";

import { Request, Response } from "express";

const redisClient = redis.createClient()


const DEAFULT_EXPIRATION: number = 3600;

// function getOrSetCahce(key, callback) {
//   return new Promise((resolve, reject) => {
//     redisClient.get(key, async (error, data) => {
//       if (error) return reject(error);
//       if (data != null) return resolve(JSON.parse(data));
//       // if neither of the above condition is met
//       // meaning me miss the cache
//       const freshData = await callback();
//       redisClient.setEx(key, DEAFULT_EXPIRATION, JSON.stringify(freshData));
//       resolve(freshData);
//     });
//   });
// }

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const sqlStatement: string = `SELECT * FROM user_table_development`;
        const sqlResult = await pool.query(sqlStatement);

        res.send(sqlResult.rows);
    } catch (error) {
        console.error(error);
    }
};

export const getUser = async (req: Request, res: Response): Promise<void | Response> => {
    try {

        const { userId } = req.params;

        // -----------------------------------------------------
        // Unblock this code if using REDIS
        // -----------------------------------------------------
        // const data = getOrSetCahce(`user?userId:${userId}`,async ()=>{
        //   const sqlStatement = `SELECT * FROM user_table_development WHERE userId = ($1)`;
        //   const sqlParams = [userId];
        //   const sqlResult = await pool.query(sqlStatement, sqlParams);

        //   return sqlResult.rows[0]
        // })
        // res.json(data)

        const sqlStatement: string = `SELECT * FROM user_table_development WHERE userId = ($1)`;
        const sqlParams: string[] = [userId];
        const sqlResult = await pool.query(sqlStatement, sqlParams);

        // if SQL return 0 rows meaning the userId is invalid
        if (!sqlResult.rowCount) {
            return res.status(404).send("Invalid userId!!");
        }
        res.send(sqlResult.rows[0]);
    } catch (error) {
        console.error(error);
    }
};

export const createUser = async (req: Request, res: Response): Promise<void | Response> => {
    try {
        const validateError = ValidateUserApiSchema(req.body).error;

        if (validateError) {
            return res.status(400)
                .send(`Please ensure the following requiurements are met:
        1. FirstName, LastName & Age must be PRESENT
        2. FirstName's length must be smaller than 255
        3. LastName's length must be smaller than 255
        4. Age must be an INTEGER and greater than 0`);
        }

        const { firstName, lastName, age }: { firstName: string, lastName: string, age: number } = req.body;

        const sqlStatement: string = `INSERT INTO user_table_development (firstName, lastName, age) VALUES ($1,$2,$3) RETURNING *`;
        const sqlParams: any[] = [firstName, lastName, age];

        const sqlResult = await pool.query(sqlStatement, sqlParams);
        res
            .status(201)
            .send(`User with the name ${firstName} has been added to the database!`);
    } catch (error) {
        console.error(error);
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void | Response> => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, age }: { firstName: string, lastName: string, age: number } = req.body;

        // Assertion to check if userid is valid
        const assertionSqlStatement: string = `SELECT * FROM user_table_development WHERE userId = ($1)`;
        const assertionSqlParams: string[] = [userId];
        const assertionSqlResult = await pool.query(
            assertionSqlStatement,
            assertionSqlParams
        );

        if (!assertionSqlResult.rowCount) {
            return res.status(400).send("Invalid userId!!");
        }

        const sqlStatement: string = `UPDATE user_table_development SET firstname = $1, lastname = $2, age = $3 WHERE userId = $4`;
        const sqlParams: any[] = [firstName, lastName, age, userId];

        const sqlResult = await pool.query(sqlStatement, sqlParams);
        res.send(`User with userId: ${userId} has been updated!`);
    } catch (error) {
        console.error(error);
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void | Response> => {
    try {
        const { userId } = req.params;

        // Assertion to check if userid is valid
        const assertionSqlStatement: string = `SELECT * FROM user_table_development WHERE userId = ($1)`;
        const assertionSqlParams: string[] = [userId];
        const assrtionSqlResult = await pool.query(
            assertionSqlStatement,
            assertionSqlParams
        );

        if (!assrtionSqlResult.rowCount) {
            return res.status(400).send("Invalid userId!!");
        }

        // SQL Delete Action
        const sqlStatement: string = `DELETE FROM user_table_development WHERE userId = $1`;
        const sqlParams: string[] = [userId];

        const sqlResult = await pool.query(sqlStatement, sqlParams);
        res.send(
            `User with userId: ${userId} has been deleted from the database!`
        );
    } catch (error) {
        console.error(error);
    }
};
