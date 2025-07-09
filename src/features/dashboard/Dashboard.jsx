import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Users from "./Users";
import Clients from "./Clients";
import Products from "./Products";

function Dashboard() {
  return (
    <Routes>
      {/* Envolvemos las rutas del dashboard con su layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="users" />} />
        <Route path="users" element={<Users />} />
        <Route path="clients" element={<Clients />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default Dashboard;
