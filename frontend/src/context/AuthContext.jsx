import { createContext, useContext, useState } from "react";
import { logoutUser } from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const accessToken = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (accessToken) {
      return {
        access: accessToken,
        role: role,
      };
    }

    return null;
  });

  const login = (loginData) => {
    localStorage.setItem("access", loginData.access);
    localStorage.setItem("refresh", loginData.refresh);
    localStorage.setItem("role", loginData.role);

    setUser({
      access: loginData.access,
      role: loginData.role,
    });
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refresh");

    try {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");

      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}