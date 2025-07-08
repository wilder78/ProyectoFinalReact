// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useNavbarBehavior from "../hooks/useNavbarBehavior";

const Navbar = () => {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbarBehavior();
  const location = useLocation();

  return (
    <nav className={`q-navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo y Marca */}
      <Link to="/" className="q-brand" onClick={closeMenu}>
        <div className="q-logo">
          <i className="fas fa-atom"></i>
        </div>
        <span className="q-brand-text">QuantumTech</span>
      </Link>

      {/* Menú de Navegación */}
      <div className={`q-nav-menu ${menuOpen ? "open" : ""}`}>
        <Link
          to="/"
          className={`q-nav-item ${location.pathname === "/" ? "active" : ""}`}
          onClick={closeMenu}
        >
          Inicio
        </Link>

        <Link
          to="/productos"
          className={`q-nav-item ${
            location.pathname === "/productos" ? "active" : ""
          }`}
          onClick={closeMenu}
        >
          Productos
        </Link>

        <Link
          to="/registro"
          className={`q-register-btn ${
            location.pathname === "/registro" ? "active" : ""
          }`}
          onClick={closeMenu}
        >
          <i className="fas fa-user-plus"></i>
          <span>Regístrate</span>
        </Link>

        <Link
          to="/carrito"
          className={`q-cart-btn ${
            location.pathname === "/carrito" ? "active" : ""
          }`}
          onClick={closeMenu}
        >
          <i className="fas fa-shopping-cart"></i>
          <span>Carrito</span>
          <span className="q-cart-count">3</span>
        </Link>
      </div>

      {/* Botón Hamburguesa */}
      <div
        className={`q-hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
