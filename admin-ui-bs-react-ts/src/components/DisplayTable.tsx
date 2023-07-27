import { useState } from "react";
import { UserInterface } from "../interface/userInterface";
import { formStateInterface } from "../interface/formInterface";
import EditForm from "./EditForm";

const defaultFormState: formStateInterface = {
  showForm: false,
  user: { id: "", name: "", email: "", role: "" },
};

interface tableProps {
  users: UserInterface[];
  handleEdit: (editeUser: UserInterface) => void;
  handleDelete: (id: string) => void;
}

const DisplayTable = (props: tableProps) => {
  const { users, handleEdit, handleDelete } = props;
  const [formState, setFormState] = useState(defaultFormState);

  const handleRowEdit = (user: UserInterface) => {
    setFormState({ showForm: true, user: user });
  };

  return formState.showForm ? (
    <EditForm
      user={formState.user}
      handleEdit={handleEdit}
      setFormState={setFormState}
    />
  ) : (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">
            <input type="checkbox" />
          </th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <button
                type="button"
                className="btn btn-rounded m-1 btn-sm btn-outline-dark"
                onClick={() => handleRowEdit(user)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn m-1 btn-sm btn-outline-danger"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTable;
