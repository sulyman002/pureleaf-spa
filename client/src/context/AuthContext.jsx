import { createContext, useState, useEffect } from "react";
import { setItem, removeItem, getItem } from "../utils/localStorage";
import { toast } from "sonner";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getItem("user") || null);

  const signUp = async (name, email, password) => {
    try {
      const response = await api.post("/auth/signup", {
        name,
        email,
        password,
      });
      toast.success("Sign up successful!");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Email already in use.");
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      const { accessToken, user } = response.data.data;
      console.log(response.data);

      setItem("accessToken", accessToken);
      setItem("user", user);
      setUser(user);

      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
      return null;
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.post(
        "/auth/forgot-password",
        {
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      );
      toast.success(response.data.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
      return null;
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      const response = await api.put("/auth/reset-password", {
        token,
        newPassword,
      });

      toast.success(response.data.data || "Password successfully reset.");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
    }
  };

  const logout = () => {
    removeItem("user");
    removeItem("accessToken");
    setUser(null);
  };

  const profile = async () => {
    try {
      const token = getItem("accessToken");
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return response.data.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials.");
      return null;
    }
  };

  useEffect(() => {
    const token = getItem("accessToken");

    if (!token) {
      return;
    }

    const fetchUser = async () => {
      const userData = await profile();
      if (userData) {
        setUser(userData);
        setItem("user", userData); 
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signUp, forgotPassword, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
