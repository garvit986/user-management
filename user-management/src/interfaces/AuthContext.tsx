import React, { createContext, useState, FC, ReactNode } from "react";
import { User, AuthContextType } from "../interfaces/Types";
import { getUserByUsername } from "../utils/LocalForage";

const defaultUser: User = {
  id: 0,
  username: "",
  password: "",
  name: "",
  address: "",
  phoneNumber: "",
  role: "",
};

export const AuthContext = createContext<AuthContextType>({
  user: defaultUser,
  isLoggedIn: false,
  login: async () => {
    throw new Error("login function not yet implemented");
  },
  logout: () => {
    throw new Error("logout function not yet implemented");
  },
});

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(defaultUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = async (username: string, password: string): Promise<User> => {
    try {
      const user = await getUserByUsername(username);
      console.log(`Retrieved user: `, user);
      if (user && user.password === password) {
        setUser(user);
        setIsLoggedIn(true);
        return user;
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error: any) {
      throw new Error("Error logging in: " + error.message);
    }
  };

  const logout = () => {
    setUser(defaultUser);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
