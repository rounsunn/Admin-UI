import axios from "axios";
import { UserInterface } from "../interface/userInterface";
import { baseURL } from "./api";

export const updateUser = async (updatedUser: UserInterface) => {
  try {
    await axios.put(baseURL, updatedUser);
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
