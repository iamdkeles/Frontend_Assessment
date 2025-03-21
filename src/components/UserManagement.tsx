"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  updateUser,
  deleteUser,
  User,
} from "../features/users/userSlice";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const UserManagement = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  const [step, setStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [newUser, setNewUser] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleSaveUser = () => {
    if (isEditing) {
      dispatch(updateUser(newUser));
      setSuccessMessage("User information has been updated!");
    } else {
      dispatch(addUser({ ...newUser, id: Date.now().toString() }));
      setSuccessMessage("New user has been added successfully!");
    }

    setNewUser({ id: "", firstName: "", lastName: "", email: "", phone: "" });
    setIsEditing(false);
    setStep(1);
  };

  const handleEditUser = (user: User) => {
    setNewUser(user);
    setIsEditing(true);
    setStep(1);
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md mb-4 transition-opacity duration-500">
          {successMessage}
        </div>
      )}

      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit User" : "Add New User"}
        </h3>

        {step === 1 && (
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleNext}
              className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="flex justify-between">
              <button
                onClick={handlePrev}
                className="p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-3">Review Details</h4>
            <p>
              <strong>Name:</strong> {newUser.firstName} {newUser.lastName}
            </p>
            <p>
              <strong>Email:</strong> {newUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {newUser.phone}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={handlePrev}
                className="p-3 bg-gray-400 text-white rounded-md hover:bg-gray-500"
              >
                Back
              </button>
              <button
                onClick={handleSaveUser}
                className={`p-3 text-white rounded-md transition ${
                  isEditing
                    ? "bg-yellow-500 hover:bg-yellow-600"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {isEditing ? "Update User" : "Save User"}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-full bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg text-center font-semibold mb-4">Users List</h3>
        <div>
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center border-b p-3"
                >
                  <span>
                    {user.firstName} {user.lastName} - {user.email}
                  </span>
                  <div className="w-full mx-auto flex justify-end">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewUser(user)}
                      className="bg-blue-500 text-white px-3 py-1 ml-2 rounded-md hover:bg-blue-600 transition"
                    >
                      View
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">No users available.</p>
            )}
          </ul>
        </div>
      </div>

      {showModal && selectedUser && (
        <Dialog.Root open={showModal} onOpenChange={setShowModal}>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-xl font-semibold mb-3">User Details</h3>
              <p>
                <strong>Name:</strong> {selectedUser.firstName}{" "}
                {selectedUser.lastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  );
};

export default UserManagement;
