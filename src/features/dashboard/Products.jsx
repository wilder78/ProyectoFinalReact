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
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: 1,
    images: ["https://placeimg.com/640/480/tech"],
  });
  const [editingId, setEditingId] = useState(null);
  const productsPerPage = 10;

  const API_URL = "https://api.escuelajs.co/api/v1/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category?.id || 1,
      images: product.images || ["https://placeimg.com/640/480/tech"],
    });
    setFormVisible(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await fetch(`${API_URL}/${productId}`, { method: "DELETE" });
      setProducts(products.filter((prod) => prod.id !== productId));
    } catch (error) {
      alert("Error eliminando producto");
    }
  };

  const handleAddProduct = () => {
    setEditingId(null);
    setFormData({
      title: "",
      price: "",
      description: "",
      categoryId: 1,
      images: ["https://placeimg.com/640/480/tech"],
    });
    setFormVisible(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (editingId) {
        setProducts((prev) => prev.map((p) => (p.id === editingId ? data : p)));
      } else {
        setProducts([data, ...products]);
      }

      setFormVisible(false);
    } catch (err) {
      alert("Error guardando el producto");
    }
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

      {formVisible && (
        <form className="product-form" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Título"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <input
            type="number"
            placeholder="Precio"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            required
          />
          <textarea
            placeholder="Descripción"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="URL de imagen"
            value={formData.images[0]}
            onChange={(e) =>
              setFormData({ ...formData, images: [e.target.value] })
            }
            required
          />
          <button type="submit">
            {editingId ? "Guardar Cambios" : "Crear Producto"}
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Cargando productos...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
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
                {currentProducts.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.id}</td>
                    <td>
                      <img
                        src={prod.images?.[0]}
                        alt={prod.title}
                        width="50"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/50?text=No+Img")
                        }
                      />
                    </td>
                    <td>{prod.title}</td>
                    <td>${prod.price}</td>
                    <td>{prod.category?.name || "Sin categoría"}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(prod)}
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
                ))}
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
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
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
