import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext"; // Cambio a useCart para consistencia
import PropTypes from "prop-types"; // Para validación de props
import "./cart.css";

function Cart() {
  // Usamos useCart en lugar de useContext para mayor consistencia
  const { getCartItemCount, cartItems } = useCart();

  // Calculamos el total de items
  const itemCount = getCartItemCount();

  return (
    <li className="nav-item ms-2 position-relative">
      <Link
        className="nav-link icon-link"
        to="/carrito"
        aria-label={`Carrito (${itemCount} productos)`}
        title={`Ver carrito (${itemCount} productos)`}
      >
        <FaShoppingCart className="nav-icon" />
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount > 9 ? "9+" : itemCount}</span>
        )}
      </Link>
    </li>
  );
}

// Validación de propiedades
Cart.propTypes = {
  getCartItemCount: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default Cart;
