import React, { useRef } from "react";
import Routes from "./Routes";
import { CartProvider } from "./features/cart/CartContext";
import ErrorBoundary from "./shared/components/ErrorBoundary";
import SwiperNotification from "./shared/components/SwiperNotification";
import "./shared/styles/styles.css";

function App() {
  const notificationRef = useRef();

  // Función global para mostrar notificaciones
  window.swiperAlert = (msg) => {
    if (notificationRef.current) {
      notificationRef.current.notify(msg);
    }
  };

  return (
    <ErrorBoundary>
      <CartProvider>
        <SwiperNotification ref={notificationRef} />
        <Routes />
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
