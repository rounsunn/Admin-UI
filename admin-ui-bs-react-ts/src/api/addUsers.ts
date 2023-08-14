import axios from "axios";
import { UserInterface } from "../interface/userInterface";
import { baseURL } from "./api";

export const addUser = async (newUserData: UserInterface[]) => {
  try {
    const resp = await axios.post(baseURL, newUserData);
    console.log(resp.data); // Newly added user data from the server
    // Update your state with the new user data
    // ...
  } catch (error) {
    console.error("Error adding user:", error);
  }
};
