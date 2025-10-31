import { createContext, useState } from "react";
import { setItem, removeItem, getItem } from "../utils/localStorage";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getItem("currentUser") || null);

  const login = (email, password) => {
    const usersData = getItem("user");
    const existingUser = Array.isArray(usersData)
      ? usersData
      : usersData
      ? [usersData]
      : [];

    const foundUser = existingUser.find(
      (user) => user.email === email && user.password === password
    );

    if (!foundUser) {
      toast.error("User does not exist. Please sign up.");
      return false;
    }

    setItem("currentUser", foundUser);
    setUser(foundUser);
    return true;
  };

  const logout = () => {
    removeItem("currentUser");
    setUser(null);
  };

  const signUp = (name, email, password) => {
    const usersData = getItem("user");
    const users = Array.isArray(usersData)
      ? usersData
      : usersData
      ? [usersData]
      : [];

    const existing = users.find((user) => user.email === email);

    if (existing) {
      toast.error("User already exists. Please log in.");
      return false;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    setItem("user", users); 
    setItem("currentUser", newUser);
    setUser(newUser);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
