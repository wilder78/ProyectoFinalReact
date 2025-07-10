import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiPlusCircle } from "react-icons/fi";
import { FaSearch, FaSpinner } from "react-icons/fa";
import "./dashboard.css";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toString().includes(searchTerm)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleEdit = (productId) => {
    console.log("Editar producto:", productId);
  };

  const handleDelete = (productId) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      setProducts(products.filter((product) => product.id !== productId));
    }
  };

  const handleAddProduct = () => {
    console.log("Agregar nuevo producto");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Administrar Productos</h2>
        <div className="admin-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-add" onClick={handleAddProduct}>
            <FiPlusCircle /> Nuevo Producto
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Reintentar</button>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Imagen</th>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>Categoría</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.id}</td>
                      <td>
                        <div className="product-image">
                          <img
                            src={prod.images?.[0]}
                            alt={prod.title}
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/60x40?text=Sin+imagen")
                            }
                          />
                        </div>
                      </td>
                      <td className="product-title">{prod.title}</td>
                      <td className="price">${prod.price?.toFixed(2)}</td>
                      <td>{prod.category?.name || "Sin categoría"}</td>
                      <td className="actions">
                        <button
                          className="btn-edit"
                          onClick={() => handleEdit(prod.id)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(prod.id)}
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">
                      No se encontraron productos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </button>

              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button>
              ))}

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
};

export default ProductsAdmin;
