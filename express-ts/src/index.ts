import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { data } from "./dataStore";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8000;

// Get the  users list
app.get("/users", (req, res) => {
  res.send(data);
});

//edit
app.put("/users", (req, res) => {
  const updatedUserData = req.body; // New user data from the request body
  const userId = updatedUserData.id;

  // Find the user by ID and update the user data
  const userToUpdate = data.find((user) => user.id === userId);
  if (userToUpdate) {
    userToUpdate.name = updatedUserData.name;
    userToUpdate.email = updatedUserData.email;
    userToUpdate.role = updatedUserData.role;
    res.status(200).json(userToUpdate);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//delete
app.delete("/users/delete", (req, res) => {
  const userIds: string[] = req.body.userIds; // userIds to be deleted from the request body

  // Find the user by ID and update the user data
  let errorFlag: boolean = false;
  userIds.forEach((userId) => {
    const userIndex = data.findIndex((user) => user.id === userId);
    if (userIndex !== -1) data.splice(userIndex, 1);
    else errorFlag = true;
  });
  if (userIds) {
    res.status(200).send(data);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//Add users
app.post("/users", (req: Request, res: Response) => {
  const user = req.body;
  data.push(...user);
  res.send(data);
});

app.listen(port, () => {
  console.log("server app listening on port 8000!");
});
