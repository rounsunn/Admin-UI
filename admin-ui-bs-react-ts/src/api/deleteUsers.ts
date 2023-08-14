import axios from "axios";
import { baseURL } from "./api";

export const deleteUser = async (userIds: string[]) => {
  if (userIds.length > 0) {
    console.log(userIds);
    try {
      const resp = await axios.delete(`${baseURL}/delete`, {
        data: { userIds: userIds }, // Send userIds as data in the request
      });
      console.log(resp.data);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  }
};
