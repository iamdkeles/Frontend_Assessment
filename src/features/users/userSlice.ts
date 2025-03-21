import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserState {
  users: User[];
}

const loadUsersFromStorage = (): User[] => {
  if (typeof window !== "undefined") {
    try {
      return JSON.parse(localStorage.getItem("users") || "[]");
    } catch (error) {
      console.error("Error loading users from localStorage:", error);
      return [];
    }
  }
  return [];
};

const saveUsersToStorage = (users: User[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("users", JSON.stringify(users));
  }
};

const initialState: UserState = {
  users: loadUsersFromStorage(),
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      saveUsersToStorage(state.users);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
        saveUsersToStorage(state.users);
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
      saveUsersToStorage(state.users);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
