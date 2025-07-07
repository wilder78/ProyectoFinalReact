import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Login({ onClose }) {
  return (
    <li className="nav-item ms-2">
      <Link
        className="nav-link icon-link"
        to="/login" // <-- Aquí cambias /perfil por /login
        aria-label="Iniciar sesión"
        onClick={onClose}
      >
        <FaUser className="nav-icon" />
      </Link>
    </li>
  );
}

export default Login;
