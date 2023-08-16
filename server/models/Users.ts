import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: { type: "string", required: true },
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  role: { type: "string", required: true, default: "user" },
});

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
