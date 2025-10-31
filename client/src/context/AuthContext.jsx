import { createContext, useState } from "react";
import { setItem, removeItem } from "../utils/localStorage";
import Password from "../pages/SettingPages/Password";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => setItem("user") || null);
    

    const login = (email, Password) => {

        if (email && Password) {
            setItem("user", email);
            setUser(email);
            return true;
        }
    }
    const logout = () => {
        removeItem("user");
        setUser(null);
    }

    const signUp = (name, email, Password) => {
        
        if(name && email && Password) {
            setItem("user", email);
            setUser(email);
            return true;
        }
    }

    return (
        <AuthContext.Provider value = {{user, login, logout, signUp}} >
            {children}
        </AuthContext.Provider>
    )
}


