import React, { useEffect, useState, useCallback } from "react";
import {
  FaSearch,
  FaSpinner,
  FaUserEdit,
  FaTrash,
  FaPlus,
  FaTimesCircle, // For error icon
  FaCheckCircle, // For success icon
} from "react-icons/fa";
import "./dashboard.css"; // Ensure you have the necessary styles

// --- API Service (apiService.js) ---
// Ideally, this would be in a separate file like `src/services/apiService.js`
const apiBaseUrl = "https://api.escuelajs.co/api/v1";

const apiService = {
  getUsers: async () => {
    const response = await fetch(`${apiBaseUrl}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },
  createUser: async (userData) => {
    const response = await fetch(`${apiBaseUrl}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userData,
        // The API requires a fixed role for new users
        role: "customer",
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user");
    }
    return response.json();
  },
  updateUser: async (id, userData) => {
    const response = await fetch(`${apiBaseUrl}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user");
    }
    return response.json();
  },
  deleteUser: async (id) => {
    const response = await fetch(`${apiBaseUrl}/users/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user");
    }
    // The API returns the deleted user object on success
    return response.json();
  },
};

// --- Notification Component (Notification.js) ---
// You might want to extract this into its own file later
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

// --- UserForm Modal Component (UserFormModal.js) ---
// This would also ideally be a separate file
const UserFormModal = ({ isOpen, onClose, user, onSave, isLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // Only for new user or if password update is allowed
    avatar: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
        password: "", // Clear password field for edits unless explicitly setting
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        avatar: "",
      });
    }
    setFormErrors({}); // Clear errors when modal opens/user changes
  }, [user, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "El nombre es requerido.";
    if (!formData.email.trim()) {
      errors.email = "El correo es requerido.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El correo no es válido.";
    }
    if (!user && !formData.password.trim()) {
      errors.password = "La contraseña es requerida para nuevos usuarios.";
    } else if (!user && formData.password.trim().length < 6) {
      errors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (!formData.avatar.trim())
      errors.avatar = "El URL del avatar es requerido.";
    // Basic URL validation
    else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(formData.avatar)) {
      errors.avatar = "El URL del avatar no es válido (solo JPG, PNG, GIF).";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{user ? "Editar Usuario" : "Crear Nuevo Usuario"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={formErrors.name ? "input-error" : ""}
            />
            {formErrors.name && (
              <span className="error-message">{formErrors.name}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? "input-error" : ""}
            />
            {formErrors.email && (
              <span className="error-message">{formErrors.email}</span>
            )}
          </div>
          {!user && ( // Password field only for new users
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={formErrors.password ? "input-error" : ""}
              />
              {formErrors.password && (
                <span className="error-message">{formErrors.password}</span>
              )}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="avatar">URL Avatar:</label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              value={formData.avatar}
              onChange={handleChange}
              className={formErrors.avatar ? "input-error" : ""}
            />
            {formErrors.avatar && (
              <span className="error-message">{formErrors.avatar}</span>
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

// --- Main Users Component ---
const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null); // { message: "", type: "" }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // User being edited or null for new user
  const [isSaving, setIsSaving] = useState(false); // For form submission loading state

  const usersPerPage = 10;

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiService.getUsers();
      // Filter out users without 'name' or 'email' or 'avatar' or if avatar is not a valid URL (the API can return incomplete data)
      const validUsers = data.filter(
        (user) =>
          user.name &&
          user.email &&
          user.avatar &&
          user.name.trim() !== "" &&
          user.email.trim() !== "" &&
          user.avatar.trim() !== "" &&
          /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(user.avatar)
      );
      setUsers(validUsers);
      setFilteredUsers(validUsers);
      setNotification(null); // Clear any previous error
    } catch (err) {
      console.error("Error fetching users:", err);
      setNotification({
        message: err.message || "Error al cargar usuarios.",
        type: "error",
      });
      setUsers([]); // Clear users on error
      setFilteredUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(results);
    setCurrentPage(1); // Reset page when filtering
  }, [searchTerm, users]);

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddUserClick = () => {
    setCurrentUser(null); // No user selected, for creation
    setIsModalOpen(true);
  };

  const handleEditUserClick = (user) => {
    setCurrentUser(user); // Set the user to be edited
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleSaveUser = async (formData) => {
    setIsSaving(true);
    try {
      if (currentUser) {
        // Update existing user
        const updatedUser = await apiService.updateUser(
          currentUser.id,
          formData
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? { ...user, ...updatedUser } : user
          )
        );
        setNotification({
          message: "Usuario actualizado con éxito.",
          type: "success",
        });
      } else {
        // Create new user
        const newUser = await apiService.createUser(formData);
        setUsers((prevUsers) => [newUser, ...prevUsers]); // Add new user to top
        setNotification({
          message: "Usuario creado con éxito.",
          type: "success",
        });
      }
      handleCloseModal();
    } catch (err) {
      console.error("Error saving user:", err);
      setNotification({
        message: err.message || "Error al guardar usuario.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
      try {
        await apiService.deleteUser(id);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        setFilteredUsers((prevFiltered) =>
          prevFiltered.filter((user) => user.id !== id)
        ); // Also update filtered list
        setNotification({
          message: "Usuario eliminado con éxito.",
          type: "success",
        });
      } catch (err) {
        console.error("Error deleting user:", err);
        setNotification({
          message: err.message || "Error al eliminar usuario.",
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
        <h2>Administrar Usuarios</h2>
        <div className="admin-actions">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar usuarios"
            />
          </div>
          <button className="btn-add" onClick={handleAddUserClick}>
            <FaPlus /> Nuevo Usuario
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Cargando usuarios...</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Avatar</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          width="40"
                          height="40"
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                          onError={(e) =>
                            (e.target.src =
                              "https://via.placeholder.com/40?text=No+Img")
                          }
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => handleEditUserClick(user)}
                          title="Editar"
                        >
                          <FaUserEdit />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      No se encontraron usuarios.
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
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                  aria-label={`Página ${index + 1}`}
                >
                  {index + 1}
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

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={currentUser}
        onSave={handleSaveUser}
        isLoading={isSaving}
      />
    </div>
  );
};

export default Users;
