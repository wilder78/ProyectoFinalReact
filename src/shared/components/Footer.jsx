import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h5>QuantumTech</h5>
          <p>
            Tu tienda confiable de productos tecnológicos. Innovación al alcance
            de tu mano.
          </p>
        </div>

        <div className="footer-section">
          <h6>Enlaces rápidos</h6>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/politica">Política de privacidad</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h6>Contacto</h6>
          <p>Email: info@techstore.com</p>
          <p>Tel: +57 312 345 6789</p>
          <div className="social-icons">
            <a href="#">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <hr />
        <p>
          &copy; {new Date().getFullYear()} TechStore. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
