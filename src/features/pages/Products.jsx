import React, { useState, useEffect } from "react";
import { useCart } from "../cart/CartContext";
import {
  FaShoppingCart,
  FaSearch,
  FaSpinner,
  FaRedo,
  FaStar,
} from "react-icons/fa";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { addToCart, getCartItemCount } = useCart();

  // Obtener categorías disponibles
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Error al cargar categorías");
        }
        const data = await response.json();
        setCategories(data.slice(0, 5)); // Limitar a 5 categorías principales
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Obtener productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = "https://api.escuelajs.co/api/v1/products";
        if (categoryFilter) {
          url = `https://api.escuelajs.co/api/v1/products/?categoryId=${categoryFilter}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error al cargar los productos");
        }
        const data = await response.json();

        // Filtrar por término de búsqueda si existe
        const filtered = searchTerm
          ? data.filter(
              (product) =>
                product.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                product.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            )
          : data;

        setProducts(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFilter]);

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      // Asegurar campos compatibles con tu carrito
      price: product.price,
      thumbnail:
        product.images?.[0] ||
        "https://via.placeholder.com/300x200?text=Imagen+no+disponible",
      quantity: 1,
    });
    alert(`${product.title} añadido al carrito`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Resetear a primera página al buscar
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryFilter(categoryId);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <FaSpinner className="spinner" />
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>
          <FaRedo /> Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <h1 className="products-title">Nuestros Productos</h1>

      <div className="search-controls">
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>

        <div className="category-filter">
          <button
            className={!categoryFilter ? "active" : ""}
            onClick={() => handleCategoryChange("")}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={categoryFilter === cat.id.toString() ? "active" : ""}
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="cart-summary">
          <FaShoppingCart className="cart-icon" />
          <span className="cart-count">{getCartItemCount()}</span>
        </div>
      </div>

      {currentProducts.length === 0 ? (
        <div className="no-products">
          <img
            src="https://cdn.dribbble.com/users/2382015/screenshots/6065978/media/8b4662f8023e4e2295f865106b5d3a7e.gif"
            alt="No hay productos"
            className="no-products-image"
          />
          <h3>No encontramos productos</h3>
          <p>Intenta con otra categoría o término de búsqueda</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("");
            }}
            className="reset-filters"
          >
            Mostrar todos los productos
          </button>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {currentProducts.map((product) => (
              <div key={product.id} className="product-card">
                {product.price > 500 && (
                  <div className="product-badge">Premium</div>
                )}
                <img
                  src={
                    product.images?.[0] ||
                    "https://via.placeholder.com/300x200?text=Imagen+no+disponible"
                  }
                  alt={product.title}
                  className="product-image"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x200?text=Imagen+no+disponible";
                  }}
                />
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-category">
                    {product.category?.name || "Sin categoría"}
                  </p>
                  <p className="product-description">
                    {product.description?.length > 60
                      ? `${product.description.substring(0, 60)}...`
                      : product.description || "Descripción no disponible"}
                  </p>

                  <div className="product-price-container">
                    <span className="product-price">${product.price}</span>
                    <div className="product-rating">
                      <FaStar className="rating-star" />
                      <span>4.5</span>{" "}
                      {/* Esta API no tiene rating, puedes personalizarlo */}
                    </div>
                  </div>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart /> Añadir al carrito
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              <span>
                Página {currentPage} de {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Products;
