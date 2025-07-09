import React from "react";
import Routes from "./Routes";
import { CartProvider } from "./features/cart/CartContext";
import ErrorBoundary from "./shared/components/ErrorBoundary";
import "./shared/styles/styles.css";

function App() {
  return (
    <ErrorBoundary>
      <CartProvider>
        <Routes />
      </CartProvider>
    </ErrorBoundary>
  );
}

export default App;
