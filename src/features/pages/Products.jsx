import React, { useState, useEffect } from "react";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("phone");
  const [cart, setCart] = useState([]);

  // Términos de búsqueda para productos tecnológicos
  const techCategories = [
    { term: "phone", name: "Smartphones" },
    { term: "laptop", name: "Laptops" },
    { term: "monitor", name: "Monitores" },
    { term: "tablet", name: "Tablets" },
    { term: "camera", name: "Cámaras" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${searchTerm}&limit=8`
        );
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();
        // Filtrar solo productos con imágenes y descripción
        const filteredProducts = data.products.filter(
          (product) => product.thumbnail && product.description
        );
        setProducts(filteredProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    alert(`${product.title} añadido al carrito`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reintentar</button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="products-title">Productos Tecnológicos</h1>

      <div className="search-controls">
        <div className="category-filter">
          {techCategories.map((cat) => (
            <button
              key={cat.term}
              className={searchTerm === cat.term ? "active" : ""}
              onClick={() => setSearchTerm(cat.term)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="cart-summary">
          <i className="fas fa-shopping-cart"></i>
          <span>
            {cart.reduce((total, item) => total + item.quantity, 0)} items
          </span>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <p>No hay productos disponibles en esta categoría</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {product.discountPercentage > 0 && (
                  <div className="product-badge">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                  }}
                />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-brand">{product.brand}</p>
                  <p className="product-description">
                    {product.description.length > 60
                      ? `${product.description.substring(0, 60)}...`
                      : product.description}
                  </p>

                  <div className="product-price-container">
                    <span className="product-price">${product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="product-original-price">
                        $
                        {Math.round(
                          product.price / (1 - product.discountPercentage / 100)
                        )}
                      </span>
                    )}
                  </div>

                  <div className="product-meta">
                    <div className="product-rating">
                      <div className="rating-stars">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.round(product.rating) ? "filled" : ""
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span>{product.rating}/5</span>
                    </div>
                    <span className="product-stock">
                      {product.stock} disponibles
                    </span>
                  </div>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <i className="fas fa-shopping-cart"></i> Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="load-more">
            <button
              onClick={() => {
                // Lógica para cargar más productos
                alert("Funcionalidad de cargar más productos");
              }}
            >
              Mostrar más productos
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
