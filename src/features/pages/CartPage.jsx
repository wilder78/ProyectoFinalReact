import React from "react";
import { useCart } from "../cart/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBasket, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import "./cartPage.css";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart(); // ← Asegúrate de tener `clearCart` en tu contexto
  const navigate = useNavigate();

  const handleCheckout = () => {
    const sesion = localStorage.getItem("sesion");

    if (!sesion) {
      Swal.fire({
        icon: "warning",
        title: "Inicio de sesión requerido",
        text: "Por favor inicia sesión para continuar con la compra.",
        confirmButtonText: "Iniciar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "¡Compra realizada!",
        text: "Gracias por tu compra. Pronto recibirás la confirmación por correo.",
        timer: 2500,
        showConfirmButton: false,
      }).then(() => {
        clearCart();             // ← Vacía el carrito
        navigate("/productos");  // ← Redirige a productos
      });
    }
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Tu Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">
            <FaShoppingBasket size={80} color="#6c757d" />
          </div>
          <h2>¡Tu carrito está vacío!</h2>
          <p className="empty-cart-message">
            Parece que aún no has agregado productos a tu carrito. Descubre
            nuestras increíbles ofertas y encuentra lo que necesitas.
          </p>
          <div className="empty-cart-suggestions">
            <h3>¿No sabes por dónde empezar?</h3>
            <ul>
              <li>Los productos más populares</li>
              <li>Ofertas especiales</li>
              <li>Novedades recientes</li>
            </ul>
          </div>
          <Link to="/productos" className="shopping-button">
            Comenzar a Comprar <FaArrowRight style={{ marginLeft: "8px" }} />
          </Link>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
