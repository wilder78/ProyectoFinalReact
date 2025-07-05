import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUser, FaMicrochip } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
// import "./navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        scrolled ? "navbar-scrolled" : "navbar-transparent"
      } fixed-top`}
    >
      <div className="container">
        {/* Logo con icono tecnológico */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <FaMicrochip className="tech-icon me-2" />
          <span className="brand-text">
            <span className="tech-word">Tech</span>
            <span className="store-word">Store</span>
          </span>
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler tech-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
        >
          <GiHamburgerMenu className="toggler-icon" />
        </button>

        {/* Nav Items */}
        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
            {/* Enlaces */}
            {[
              { path: "/", name: "Inicio" },
              { path: "/productos", name: "Productos" },
              { path: "/categorias", name: "Categorías" },
              { path: "/ofertas", name: "Ofertas" },
              { path: "/contacto", name: "Contacto" },
            ].map((item) => (
              <li className="nav-item mx-1" key={item.path}>
                <Link
                  className={`nav-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Íconos perfil y carrito */}
            <li className="nav-item ms-2">
              <Link
                className="nav-link icon-link"
                to="/perfil"
                aria-label="Perfil"
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="nav-icon" />
              </Link>
            </li>
            <li className="nav-item ms-2 position-relative">
              <Link
                className="nav-link icon-link"
                to="/carrito"
                aria-label="Carrito"
                onClick={() => setIsOpen(false)}
              >
                <FaShoppingCart className="nav-icon" />
                <span className="cart-badge">3</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
