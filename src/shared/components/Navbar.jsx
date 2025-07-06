import { Link, useLocation } from "react-router-dom";
import { FaMicrochip } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Cart from "../../features/cart/Cart";
import Login from "../../features/auth/Login";
import useNavbarBehavior from "../hooks/useNavbarBehavior";

function Navbar() {
  const location = useLocation();
  const { isOpen, setIsOpen, scrolled, toggleNavbar } = useNavbarBehavior();

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
              { path: "/registro", name: "Registro" },
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
            <Login onClose={() => setIsOpen(false)} />
            <Cart />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
