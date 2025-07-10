import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Contexts
import { AuthProvider } from "./context/AuthContext";

// Layouts
import PublicLayout from "./shared/components/PublicLayout";
import DashboardLayout from "./features/dashboard/DashboardLayout";

// Páginas públicas
import Home from "./features/pages/Home";
import Productos from "./features/pages/Products";
import Categorias from "./features/pages/Categories";
import Register from "./features/pages/Register";
import LoginForm from "./features/auth/LoginForm";

// Dashboard (admin)
import Users from "./features/dashboard/Users";
import ProductsAdmin from "./features/dashboard/Products";
import CartPage from "./features/pages/CartPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* <--- AuthProvider starts here */}
        <Routes>
          {/* Rutas públicas con Navbar y Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/carrito" element={<CartPage />} />
          </Route>

          {/* Rutas del Dashboard (admin) */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="users" element={<Users />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="settings" element={<div>Settings Page</div>} />
          </Route>
        </Routes>
      </AuthProvider>{" "}
    </BrowserRouter>
  );
}

export default AppRoutes;
