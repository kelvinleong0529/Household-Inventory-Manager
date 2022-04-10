-- need to first create a DATABASE before we can create a TABLE
CREATE DATABASE user_database;


CREATE TABLE user_table_development(
    userId SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    age INT NOT NULL CHECK(age>0)
);