import { useState, useEffect } from "react";
import { UserInterface, UserListInterface } from "../interface/userInterface";
import DsiplayRow from "./DsiplayRow";
import { updateUser } from "../api/updateUser";
import { deleteUser } from "../api/deleteUsers";

const delBtnClass = "btn rounded-pill btn-sm btn-outline-danger p-2";
const addBtnClass = "btn rounded-pill btn-sm btn-outline-warning p-2";

interface tableProps {
  USERS: UserListInterface;
  setUSERS: React.Dispatch<React.SetStateAction<UserListInterface>>;
  currentPageNumber: number;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayTable = (props: tableProps) => {
  const { USERS, setUSERS, currentPageNumber, setIsAdding } = props;

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const users = USERS.filteredUsers.slice(
    (currentPageNumber - 1) * 10,
    (currentPageNumber - 1) * 10 + 10
  );

  useEffect(() => {
    const checkIsAllChecked = () => {
      let flag = true;
      users.forEach((user) => {
        if (!selectedUsers.includes(user.id)) flag = false;
      });
      if (allChecked !== flag) setAllChecked(flag);
    };
    checkIsAllChecked();
  }, [selectedUsers, allChecked, users]);

  const selectAll = () => {
    allChecked
      ? setSelectedUsers([])
      : setSelectedUsers(users.map((user) => user.id));
  };

  const selectOne = (curId: string) => {
    if (selectedUsers.includes(curId)) {
      const index = selectedUsers.indexOf(curId);
      if (index > -1) {
        selectedUsers.splice(index, 1);
      }
    } else selectedUsers.push(curId);
    setSelectedUsers([...selectedUsers]);
  };

  const handleEdit = (editedUser: UserInterface) => {
    const editedAllUsers = USERS.allUsers.map((user) => {
      if (user.id === editedUser.id) user = editedUser;
      return user;
    });
    const editedFilteredUsers = USERS.filteredUsers.map((user) => {
      if (user.id === editedUser.id) user = editedUser;
      return user;
    });
    try {
      updateUser(editedUser);
      setUSERS({
        allUsers: editedAllUsers,
        filteredUsers: editedFilteredUsers,
      });
    } catch (error) {
      console.log("Error while updating user", error);
    }
  };

  const handleDelete = (ids: string[] = selectedUsers) => {
    const finalAllUsers = USERS.allUsers.filter((user) => {
      let flag = true;
      ids.forEach((id) => {
        if (id === user.id) flag = false;
      });
      return flag;
    });
    const finalFileteredUsers = USERS.filteredUsers.filter((user) => {
      let flag = true;
      ids.forEach((id) => {
        if (id === user.id) flag = false;
      });
      return flag;
    });
    deleteUser(ids);
    setUSERS({ allUsers: finalAllUsers, filteredUsers: finalFileteredUsers });
  };

  const displayHead = () => {
    return (
      <tr>
        <th scope="col">
          <input type="checkbox" checked={allChecked} onChange={selectAll} />
        </th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col" className="text-center">
          Actions
        </th>
      </tr>
    );
  };

  const displayRow = () => {
    return users.map((user) => (
      <tr
        key={user.id}
        className={selectedUsers.includes(user.id) ? "table-active" : ""}
      >
        <td>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.id)}
            onChange={() => selectOne(user.id)}
          />
        </td>
        <DsiplayRow
          user={user}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </tr>
    ));
  };

  return (
    <>
      <div className="row">
        <div className="col table-responsive p-0">
          <table className="table table-hover">
            <thead>{displayHead()}</thead>
            <tbody>{displayRow()}</tbody>
          </table>
        </div>
      </div>
      <div className="row py-2 align-items-center">
        <div className="col">
          <button className={delBtnClass} onClick={() => handleDelete()}>
            Delete Selected
          </button>
        </div>
        <div className="col d-flex justify-content-end">
          <button className={addBtnClass} onClick={() => setIsAdding(true)}>
            Add Users
          </button>
        </div>
      </div>
    </>
  );
};

export default DisplayTable;
