import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Cart() {
  return (
    <li className="nav-item ms-2 position-relative">
      <Link className="nav-link icon-link" to="/carrito" aria-label="Carrito">
        <FaShoppingCart className="nav-icon" />
        <span className="cart-badge">3</span>
      </Link>
    </li>
  );
}

export default Cart;
