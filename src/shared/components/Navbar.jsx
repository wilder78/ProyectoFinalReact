// src/components/Navbar/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import useNavbarBehavior from "../hooks/useNavbarBehavior";
import { useCart } from "../../features/cart/CartContext";
import { useAuth } from "../../context/AuthContext"; // Import useAuth hook
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaShoppingCart,
} from "react-icons/fa"; // Import icons

const Navbar = () => {
  const { scrolled, menuOpen, toggleMenu, closeMenu } = useNavbarBehavior();
  const location = useLocation();
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth(); // Get isLoggedIn and logout from AuthContext

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    closeMenu(); // Close the mobile menu after logging out
  };

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

        {isLoggedIn ? (
          // If logged in, show "Salir" button
          <button className="q-login-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            <span>Salir</span>
          </button>
        ) : (
          // If not logged in, show "Iniciar Sesión" and "Regístrate" buttons
          <>
            <Link
              to="/login"
              className={`q-login-btn ${
                location.pathname === "/login" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              <FaSignInAlt />
              <span>Iniciar sesión</span>
            </Link>

            <Link
              to="/registro"
              className={`q-register-btn ${
                location.pathname === "/registro" ? "active" : ""
              }`}
              onClick={closeMenu}
            >
              <FaUserPlus />
              <span>Regístrate</span>
            </Link>
          </>
        )}

        {/* Carrito */}
        <Link
          to="/carrito"
          className={`q-cart-btn ${
            location.pathname === "/carrito" ? "active" : ""
          }`}
          onClick={closeMenu}
        >
          <FaShoppingCart />
          <span>Carrito</span>
          {cartCount > 0 && <span className="q-cart-count">{cartCount}</span>}
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
