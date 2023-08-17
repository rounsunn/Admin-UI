import express from "express";
import mongoose from "mongoose";
import UserModel from "./models/Users";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

console.log(process.env.MONGOLAB_URI);

mongoose.connect(process.env.MONGOLAB_URI as string);

app.get("/", (req, res) => {
  res.send("Hello Word from express ts mongoose");
});

//Fetch the users
app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    // Handle the results here
    // console.log(users);
    res.send(users);
  } catch (error) {
    // Handle the error here
    console.log("Error while fetching Users", error);
  }
});

//Update the user
app.put("/updateUser", async (req, res) => {
  try {
    const editedUser = req.body;
    const user = await UserModel.findByIdAndUpdate(editedUser._id, editedUser, {
      new: false,
    });
    // Handle the results here
    res.send(user);
  } catch (error) {
    // Handle the error here
    console.log("Error while updating User", error);
  }
});

//Add Users
// Define the ValidationError type (if not provided by your libraries)
interface ValidationError extends Error {
  name: "ValidationError";
  errors: Record<string, any>;
}

app.post("/createUsers", async (req, res) => {
  try {
    const user = req.body;
    const newUser = new UserModel(...user);
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    console.log("Error while creating new Users", error);
    // Check if the error is a validation error
    if (error instanceof Error) {
      // Send a 400 Bad Request response with the validation error details
      const validationError = error as ValidationError;
      res
        .status(400)
        .send({ error: "Validation error", details: validationError.errors });
    } else {
      // Send a general error response
      res.status(500).send("Error while updating User");
    }
  }
});

//Delete Users
app.delete("/deleteUsers", async (req, res) => {
  try {
    const userIds = req.body.userIds;
    // userIds.forEach(async (_id: string) => {
    //   await UserModel.findByIdAndDelete(_id);
    // });
    await UserModel.deleteMany({ id: { $in: userIds } }); // Delete documents with matching 'id' values

    const users = await UserModel.find();
    // Handle the results here
    // console.log(user);
    res.send(users);
  } catch (error) {
    // Handle the error here
    console.log("Error while deleting User", error);
  }
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Example app listening on port 8000!");
});
