import React from "react";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Menu from "./pages/Menu.jsx";
import Settings from "./pages/Settings.jsx";
import Profile from "./pages/SettingPages/Profile.jsx";
import Password from "./pages/SettingPages/Password.jsx";
import Team from "./pages/SettingPages/Team.jsx";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<Register />} />

        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="menu" element={<Menu />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<Password />} />
            <Route path="team" element={<Team />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
