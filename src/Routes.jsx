import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./shared/components/Navbar";
import Footer from "./shared/components/Footer";

// Importa tus páginas aquí
import Home from "./features/pages/Home";
import Productos from "./features/pages/Products";
import Categorias from "./features/pages/Categories";
import Ofertas from "./features/pages/Offers";
import Perfil from "./features/pages/Register";
import Register from "./features/pages/Register";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
