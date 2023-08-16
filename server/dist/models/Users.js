"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    id: { type: "string", required: true },
    name: { type: "string", required: true },
    email: { type: "string", required: true },
    role: { type: "string", required: true, default: "user" },
});
const UserModel = mongoose_1.default.model("users", UserSchema);
exports.default = UserModel;
