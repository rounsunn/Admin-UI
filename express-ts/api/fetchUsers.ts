import axios from "axios";
import { user } from "../src/dataModel";

const baseURL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const fetchUsers = () => {
  let data: user[] = [];
  const fetchU = async () => {
    try {
      const resp = await axios.get<user[]>(baseURL);
      //   console.log(resp);
      data.push(...resp.data);
    } catch (error) {
      if (error instanceof Error) {
        data: error.message;
      } else {
        data: "Unknown error occured";
      }
    }
  };
  void fetchU();
  return { data };
};
