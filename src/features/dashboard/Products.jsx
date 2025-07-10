import React, { useState, useEffect, useCallback } from "react";
import { FiEdit2, FiTrash2, FiPlusCircle } from "react-icons/fi";
import {
  FaSearch,
  FaSpinner,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import "./dashboard.css"; // Ensure you have the necessary styles from the previous example

// --- API Service (apiService.js) ---
// Ideally, this would be in a separate file like `src/services/apiService.js`
const API_BASE_URL = "https://api.escuelajs.co/api/v1";

const productApiService = {
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },
  getProductCategories: async () => {
    // Fetch categories for the dropdown in the form
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  },
  createProduct: async (productData) => {
    const response = await fetch(`${API_BASE_URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create product");
    }
    return response.json();
  },
  updateProduct: async (id, productData) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update product");
    }
    return response.json();
  },
  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete product");
    }
    return true; // Return true on successful deletion
  },
};

// --- Notification Component (Notification.js) ---
// Re-using the same Notification component from the Users example
const Notification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`notification ${type}`}>
      {type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
      <span>{message}</span>
      <button onClick={onClose} className="notification-close">
        &times;
      </button>
    </div>
  );
};

// --- ProductFormModal Component (ProductFormModal.js) ---
// This would also ideally be a separate file
const ProductFormModal = ({
  isOpen,
  onClose,
  product,
  onSave,
  isLoading,
  categories,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "", // Initialize with empty string, will be set on edit or default
    images: ["https://placeimg.com/640/480/tech"],
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        description: product.description || "",
        categoryId:
          product.category?.id ||
          (categories.length > 0 ? categories[0].id : ""),
        images: product.images?.[0]
          ? [product.images[0]]
          : ["https://placeimg.com/640/480/tech"],
      });
    } else {
      setFormData({
        title: "",
        price: "",
        description: "",
        categoryId: categories.length > 0 ? categories[0].id : "", // Default to first category
        images: ["https://placeimg.com/640/480/tech"],
      });
    }
    setFormErrors({}); // Clear errors when modal opens/product changes
  }, [product, isOpen, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleImageChange = (e) => {
    const imageUrl = e.target.value;
    setFormData((prev) => ({ ...prev, images: [imageUrl] }));
    if (formErrors.images) {
      setFormErrors((prev) => ({ ...prev, images: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "El título es requerido.";
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0)
      errors.price = "El precio debe ser un número positivo.";
    if (!formData.description.trim())
      errors.description = "La descripción es requerida.";
    if (!formData.categoryId) errors.categoryId = "La categoría es requerida.";
    if (!formData.images[0]?.trim())
      errors.images = "El URL de la imagen es requerido.";
    else if (
      !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.images[0])
    ) {
      errors.images =
        "El URL de la imagen no es válido (solo JPG, PNG, GIF, WebP).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({
        ...formData,
        price: Number(formData.price), // Ensure price is a number
        categoryId: Number(formData.categoryId), // Ensure categoryId is a number
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{product ? "Editar Producto" : "Crear Nuevo Producto"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Título:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={formErrors.title ? "input-error" : ""}
            />
            {formErrors.title && (
              <span className="error-message">{formErrors.title}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="price">Precio:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={formErrors.price ? "input-error" : ""}
            />
            {formErrors.price && (
              <span className="error-message">{formErrors.price}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className={formErrors.description ? "input-error" : ""}
            />
            {formErrors.description && (
              <span className="error-message">{formErrors.description}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoría:</label>
            <select
              id="category"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={formErrors.categoryId ? "input-error" : ""}
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formErrors.categoryId && (
              <span className="error-message">{formErrors.categoryId}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="images">URL de Imagen:</label>
            <input
              type="text"
              id="images"
              name="images"
              value={formData.images[0]}
              onChange={handleImageChange}
              className={formErrors.images ? "input-error" : ""}
            />
            {formErrors.images && (
              <span className="error-message">{formErrors.images}</span>
            )}
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? (
                <>
                  <FaSpinner className="spinner" /> Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main ProductsAdmin Component ---
const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null); // { message: "", type: "" }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Product being edited or null for new product
  const [isSaving, setIsSaving] = useState(false); // For form submission loading state
  const [categories, setCategories] = useState([]); // To store product categories for the form

  const productsPerPage = 10;

  const fetchProductsAndCategories = useCallback(async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const [productsData, categoriesData] = await Promise.all([
        productApiService.getProducts(),
        productApiService.getProductCategories(),
      ]);

      // Basic validation and filtering of products for display
      const validProducts = productsData.filter(
        (product) =>
          product.title &&
          product.price &&
          product.description &&
          product.images?.[0] &&
          product.category?.name &&
          product.title.trim() !== "" &&
          product.description.trim() !== "" &&
          product.images[0].trim() !== "" &&
          /^(ftp|http|https):\/\/[^ "]+$/.test(product.images[0]) // Simple URL regex
      );

      setProducts(validProducts);
      setFilteredProducts(validProducts);
      setCategories(categoriesData);
      setNotification(null); // Clear any previous error notification
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Error al cargar productos o categorías.");
      setNotification({
        message: err.message || "Error al cargar datos.",
        type: "error",
      });
      setProducts([]); // Clear products on error
      setFilteredProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductsAndCategories();
  }, [fetchProductsAndCategories]);

  // Effect for search filtering
  useEffect(() => {
    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
    setCurrentPage(1); // Reset page when filtering
  }, [searchTerm, products]);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddProductClick = () => {
    setCurrentProduct(null); // No product selected, for creation
    setIsModalOpen(true);
  };

  const handleEditProductClick = (product) => {
    setCurrentProduct(product); // Set the product to be edited
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleSaveProduct = async (formData) => {
    setIsSaving(true);
    setError(null); // Clear previous errors
    try {
      if (currentProduct) {
        // Update existing product
        const updatedProduct = await productApiService.updateProduct(
          currentProduct.id,
          formData
        );
        setProducts((prev) =>
          prev.map((p) =>
            p.id === updatedProduct.id
              ? {
                  ...p,
                  ...updatedProduct,
                  category: updatedProduct.category || p.category,
                }
              : p
          )
        );
        setNotification({
          message: "Producto actualizado con éxito.",
          type: "success",
        });
      } else {
        // Create new product
        const newProduct = await productApiService.createProduct(formData);
        setProducts((prev) => [newProduct, ...prev]); // Add new product to top
        setNotification({
          message: "Producto creado con éxito.",
          type: "success",
        });
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error saving product:", err);
      setError(err.message || "Error al guardar el producto.");
      setNotification({
        message: err.message || "Error al guardar el producto.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      setError(null); // Clear previous errors
      try {
        await productApiService.deleteProduct(productId);
        setProducts((prev) => prev.filter((prod) => prod.id !== productId));
        setFilteredProducts((prev) =>
          prev.filter((prod) => prod.id !== productId)
        ); // Also update filtered list
        setNotification({
          message: "Producto eliminado con éxito.",
          type: "success",
        });
      } catch (err) {
        console.error("Error deleting product:", err);
        setError(err.message || "Error al eliminar producto.");
        setNotification({
          message: err.message || "Error al eliminar producto.",
          type: "error",
        });
      }
    }
  };

  return (
    <div className="admin-container">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="admin-header">
        <h2>Administrar Productos</h2>
        <div className="admin-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por título, descripción o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar productos"
            />
          </div>
          <button className="btn-add" onClick={handleAddProductClick}>
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
        <div className="error-message-container">
          <FaTimesCircle className="error-icon" />
          <p>{error}</p>
          <button className="btn-retry" onClick={fetchProductsAndCategories}>
            Reintentar
          </button>
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
                        <img
                          src={prod.images?.[0]}
                          alt={prod.title}
                          width="50"
                          height="50"
                          style={{ objectFit: "cover", borderRadius: "5px" }}
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/50?text=No+Img")
                          }
                        />
                      </td>
                      <td>{prod.title}</td>
                      <td>${prod.price?.toFixed(2)}</td> {/* Format price */}
                      <td>{prod.category?.name || "Sin categoría"}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => handleEditProductClick(prod)}
                          title="Editar Producto"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteProduct(prod.id)}
                          title="Eliminar Producto"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="no-results">
                      No se encontraron productos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                Anterior
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => handlePageChange(i + 1)}
                  aria-label={`Página ${i + 1}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Siguiente página"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={currentProduct}
        onSave={handleSaveProduct}
        isLoading={isSaving}
        categories={categories}
      />
    </div>
  );
};

export default ProductsAdmin;
