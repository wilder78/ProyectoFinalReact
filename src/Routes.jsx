import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./shared/components/PublicLayout"; // Nuevo layout
import DashboardLayout from "./features/dashboard/DashboardLayout";

// Páginas públicas
import Home from "./features/pages/Home";
import Productos from "./features/pages/Products";
import Categorias from "./features/pages/Categories";
import Ofertas from "./features/pages/Offers";
import Register from "./features/pages/Register";
import LoginForm from "./features/auth/LoginForm";

// Dashboard (admin)
import Users from "./features/dashboard/Users";
import Clients from "./features/dashboard/Clients";
import ProductsAdmin from "./features/dashboard/Products";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas con Navbar y Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<LoginForm />} />
        </Route>

        {/* Rutas del dashboard SIN Navbar y Footer */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users" element={<Users />} />
          <Route path="clients" element={<Clients />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="settings" element={<div>Settings Page</div>} />
          <Route path="orders" element={<div>Orders Page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
