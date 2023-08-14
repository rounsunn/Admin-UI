"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dataStore_1 = require("./dataStore");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const port = 8000;
// Get the  users list
app.get("/users", (req, res) => {
    res.send(dataStore_1.data);
});
//edit
app.put("/users", (req, res) => {
    const updatedUserData = req.body; // New user data from the request body
    const userId = updatedUserData.id;
    // Find the user by ID and update the user data
    const userToUpdate = dataStore_1.data.find((user) => user.id === userId);
    if (userToUpdate) {
        userToUpdate.name = updatedUserData.name;
        userToUpdate.email = updatedUserData.email;
        userToUpdate.role = updatedUserData.role;
        res.status(200).json(userToUpdate);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
//delete
app.delete("/users/delete", (req, res) => {
    const userIds = req.body.userIds; // userIds to be deleted from the request body
    // Find the user by ID and update the user data
    let errorFlag = false;
    userIds.forEach((userId) => {
        const userIndex = dataStore_1.data.findIndex((user) => user.id === userId);
        if (userIndex !== -1)
            dataStore_1.data.splice(userIndex, 1);
        else
            errorFlag = true;
    });
    if (userIds) {
        res.status(200).send(dataStore_1.data);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
});
//Add users
app.post("/users", (req, res) => {
    const user = req.body;
    dataStore_1.data.push(...user);
    res.send(dataStore_1.data);
});
app.listen(port, () => {
    console.log("server app listening on port 8000!");
});
