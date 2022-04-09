import { v4 as uuidv4 } from "uuid";

let users = [];

export const getUsers = (req, res) => {
  console.log(users);
  res.send(users);
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const foundUser = users.find((user) => user.id === id);

  if (foundUser) {
    res.send(foundUser);
  } else {
    res.send(`Failed to find user with user id: ${id}`);
  }

  res.send(foundUser);
};

export const deleteUser = (req, res) => {
  const { id } = req.params;

  // filter function keeps whatever element that is returned TRUE
  users = users.filter((user) => user.id !== id);

  res.send(`User with id ${id} has been deleted from database!`);
};

export const createUser = (req, res) => {
  const user = req.body;
  // create a new user object and spread all the USER properties into it
  const userWithId = { ...user, id: uuidv4() };
  users.push(userWithId);
  res.send(`User with the username ${user.firstName} added to the database!`);
};

export const updateUser = (req, res) => {
  const { id } = req.params;

  // destructure the body contents that we get from the request body
  // only need to include the info / part that need to be updated in the JSON body of the PATCH request
  const { firstName, lastName, age } = req.body;

  const user = users.find((user) => user.id === id);

  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  res.send(`User with the id ${id} has been updated!`);
};
