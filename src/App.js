

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ContractDetail from "./pages/ContractDetail";
import { AuthContext } from "./context/AuthContext";

function Protected({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    // routes for diff router on same page
    <Routes>
      <Route path="/login" element={
        <Login />}
      />
      <Route path="/" element={
          <Protected>
          <Dashboard />
          </Protected>}
      />
      <Route path="/contracts/:id" element={
          <Protected>
          <ContractDetail />
          </Protected>}
      />
      <Route path="*" element={
        <Navigate to="/" />}
      />
    </Routes>
  );
}
