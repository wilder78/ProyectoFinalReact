import React from "react";
import { useCart } from "../cart/CartContext";
import "./cartPage.css";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  return (
    <div className="cart-page">
      <h1>Tu Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.title} width="80" />
              <div>
                <h3>{item.title}</h3>
                <p>Precio: ${item.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${getCartTotal().toFixed(2)}</h3>
            <button className="checkout-button">Proceder al Pago</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
