import React from "react";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import { Menu } from "lucide-react";
import Analytics from "./pages/Analytics";

const App = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="/" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu" element={<Menu />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
};

export default App;
