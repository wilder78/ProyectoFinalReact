import React from "react";
import "./navbar.css"; // Importa el archivo CSS del Navbar

function Navbar() {
  return (
    <>
      <nav class="q-navbar" role="navigation" aria-label="Menú principal">
        <a href="#" class="q-brand">
          <div class="q-logo" aria-hidden="true">
            <i class="fas fa-atom" aria-hidden="true"></i>
          </div>
          <span class="q-brand-text">QuantumTech</span>
        </a>

        <div class="q-nav-menu" id="navMenu">
          <a href="#" class="q-nav-item active">
            Inicio
          </a>
          <a href="#productos" class="q-nav-item">
            Productos
          </a>
          <a href="#registro" class="q-register-btn" role="button">
            <i class="fas fa-user-plus"></i>
            <span>Regístrate</span>
          </a>
          <a href="#carrito" class="q-cart-btn" role="button">
            <i class="fas fa-shopping-cart"></i>
            <span>Carrito</span>
            <span class="q-cart-count" aria-label="3 artículos">
              3
            </span>
          </a>
        </div>

        <button
          class="q-hamburger"
          id="hamburger"
          aria-label="Abrir menú"
          aria-expanded="false"
          aria-controls="navMenu"
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </>
  );
}

export default Navbar;
