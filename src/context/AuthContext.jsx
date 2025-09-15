import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);
//   for login demo password
  const login = ({ username, password }) => {
    if (password === "test123") {
      const fakeToken = "fake-jwt-" + btoa(username + Date.now());
      setToken(fakeToken);
      return { ok: true };
    }
    // if demo password not entered by user then show invalid password
    return { ok: false, message: "Invalid password" };
  };

  const logout = () => setToken(null);

  return (
    // passing the props
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}
