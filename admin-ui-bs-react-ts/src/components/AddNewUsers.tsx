import { useState } from "react";
import { defaultUser, defaultUsers } from "../interface/defaultValues";
import { UserInterface } from "../interface/userInterface";

const addBtnClass = "btn rounded-pill btn-sm btn-outline-warning p-2";

interface props {
  handleAdd: (newUsers: UserInterface[]) => void;
}

const AddNewUsers = ({ handleAdd }: props) => {
  const [newUser, setNewUser] = useState(defaultUser);
  const [newUsers, setNewUsers] = useState(defaultUsers);

  const addNewUser = () => {
    if (newUser.name != "" && newUser.email != "" && newUser.role != "") {
      setNewUsers([...newUsers, { ...newUser, id: Math.random().toString() }]);
      setNewUser(defaultUser);
    } else {
      alert("Please fill all the fields");
    }
  };

  const displayHead = () => {
    return (
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
        <th scope="col">Save</th>
      </tr>
    );
  };

  const displayRow = () => {
    return (
      <>
        {newUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))}
        <tr>
          <td>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </td>
          <td>
            <input
              type="text"
              className="form-control"
              placeholder="Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            />
          </td>
          <td className="d-flex justify-content-center">
            <i
              className="btn m-1 btn-sm btn-outline-success bi bi-save "
              onClick={addNewUser}
            ></i>
          </td>
        </tr>
      </>
    );
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
        <div className="col d-flex justify-content-end">
          <button className={addBtnClass} onClick={() => handleAdd(newUsers)}>
            Save New Users
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNewUsers;
