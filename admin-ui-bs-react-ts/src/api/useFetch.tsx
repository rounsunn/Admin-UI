import { useEffect, useState } from "react";
import { UserInterface } from "../interface/userInterface";
import axios from "axios";
import { defaultUsers } from "../interface/defaultValues";

const useFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiUserData, setApiUserData] = useState(defaultUsers);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchUsers = async () => {
      try {
        const resp = await axios.get<UserInterface[]>(`${url}/getUsers`);
        setApiUserData(resp.data);
      } catch (error) {
        if (error instanceof Error) {
          setServerError(error.message);
        } else {
          setServerError("Unknown error occured");
        }
      } finally {
        setIsLoading(false);
      }
    };
    void fetchUsers();
  }, [url]);

  return { isLoading, apiUserData, serverError };
};

export default useFetch;
