import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";
import SearchBar from "./SearchBar";
import DisplayTable from "./DisplayTable";
import Pagination from "./Pagination";
import useFetch from "../api/useFetch";
import { baseURL } from "../api/api";
import { defaultUsersList } from "../interface/defaultValues";
import { UserInterface } from "../interface/userInterface";
import AddNewUsers from "./AddNewUsers";
import { addUser } from "../api/addUsers";

const UserDashboard = () => {
  const { isLoading, apiUserData, serverError } = useFetch(baseURL);
  const [USERS, setUSERS] = useState(defaultUsersList);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setUSERS({ allUsers: apiUserData, filteredUsers: apiUserData });
  }, [apiUserData]);

  const totalPages = Math.ceil(USERS.filteredUsers.length / 10);

  useEffect(() => {
    const newPageNumber = Math.max(1, totalPages);
    if (totalPages < currentPageNumber) setCurrentPageNumber(newPageNumber);
  }, [totalPages, currentPageNumber]);

  function handleSearch(e: React.FormEvent<HTMLInputElement>) {
    let searchText: string;
    if (e.target instanceof HTMLInputElement) searchText = e.target.value;
    const filteredUsers = USERS.allUsers.filter((user) => {
      return (
        user.name.includes(searchText) ||
        user.email.includes(searchText) ||
        user.role.includes(searchText)
      );
    });
    setUSERS((users) => ({ ...users, filteredUsers: filteredUsers }));
  }

  const handleAdd = (newUsers: UserInterface[]) => {
    setUSERS({
      allUsers: [...USERS.allUsers, ...newUsers],
      filteredUsers: [...USERS.filteredUsers, ...newUsers],
    });
    void addUser(newUsers);
    setIsAdding(false);
  };

  return isLoading || serverError !== "" ? (
    <LoadingPage flag={isLoading} errorMessage="serverError" />
  ) : isAdding ? (
    <AddNewUsers handleAdd={handleAdd} />
  ) : (
    <>
      <SearchBar handleSearch={handleSearch} />
      <DisplayTable
        USERS={USERS}
        setUSERS={setUSERS}
        currentPageNumber={currentPageNumber}
        setIsAdding={setIsAdding}
      />
      <Pagination
        totalPages={totalPages}
        currentPageNumber={currentPageNumber}
        setCurrentPageNumber={setCurrentPageNumber}
      />
    </>
  );
};

export default UserDashboard;
