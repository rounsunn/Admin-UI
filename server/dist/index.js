"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Users_1 = __importDefault(require("./models/Users"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
dotenv_1.default.config();
console.log(process.env.MONGOLAB_URI);
mongoose_1.default.connect(process.env.MONGOLAB_URI);
app.get("/", (req, res) => {
    res.send("Hello Word from express ts mongoose");
});
//Fetch the users
app.get("/getUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield Users_1.default.find({});
        // Handle the results here
        // console.log(users);
        res.send(users);
    }
    catch (error) {
        // Handle the error here
        console.log("Error while fetching Users", error);
    }
}));
//Update the user
app.put("/updateUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const editedUser = req.body;
        const user = yield Users_1.default.findByIdAndUpdate(editedUser._id, editedUser, {
            new: false,
        });
        // Handle the results here
        res.send(user);
    }
    catch (error) {
        // Handle the error here
        console.log("Error while updating User", error);
    }
}));
app.post("/createUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const newUser = new Users_1.default(...user);
        yield newUser.save();
        res.send(newUser);
    }
    catch (error) {
        console.log("Error while creating new Users", error);
        // Check if the error is a validation error
        if (error instanceof Error) {
            // Send a 400 Bad Request response with the validation error details
            const validationError = error;
            res
                .status(400)
                .send({ error: "Validation error", details: validationError.errors });
        }
        else {
            // Send a general error response
            res.status(500).send("Error while updating User");
        }
    }
}));
//Delete Users
app.delete("/deleteUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIds = req.body.userIds;
        // userIds.forEach(async (_id: string) => {
        //   await UserModel.findByIdAndDelete(_id);
        // });
        yield Users_1.default.deleteMany({ id: { $in: userIds } }); // Delete documents with matching 'id' values
        const users = yield Users_1.default.find();
        // Handle the results here
        // console.log(user);
        res.send(users);
    }
    catch (error) {
        // Handle the error here
        console.log("Error while deleting User", error);
    }
}));
app.listen(process.env.PORT || 8000, () => {
    console.log("Example app listening on port 8000!");
});
