-- need to first create a DATABASE before we can create a TABLE
CREATE DATABASE user_database;

-- \c into user_database

CREATE TABLE testing_user(
    user_id SERIAL PRIMARY KEY NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    age INT NOT NULL CHECK(age>0)
);