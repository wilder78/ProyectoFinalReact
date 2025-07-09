import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import Users from "./Users";
import Clients from "./Clients";
import Products from "./Products";
import Settings from "./Settings";
import Orders from "./Orders";

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="users" />} />
        <Route path="users" element={<Users />} />
        <Route path="clients" element={<Clients />} />
        <Route path="products" element={<Products />} />
        <Route path="settings" element={<Settings />} />
        <Route path="orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default Dashboard;

