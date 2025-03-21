import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deleteUser } from "../features/users/userSlice";
import { Link } from "react-router-dom";

const UserList = () => {
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Users</h2>
      {users.map((user) => (
        <div key={user.id} className="border p-2 mb-2 flex justify-between">
          <div>
            {user.firstName} {user.lastName}
          </div>
          <div>
            <Link to={`/user/${user.id}`} className="btn">
              View
            </Link>
            <button
              onClick={() => dispatch(deleteUser(user.id))}
              className="btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
