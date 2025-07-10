import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaSpinner,
  FaUserEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import "./dashboard.css"; // Asegúrate de tener los estilos necesarios

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/users");
        if (!res.ok) throw new Error("Error al cargar usuarios");
        const data = await res.json();
        setUsers(data);
        setFiltered(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiltered(results);
    setCurrentPage(1); // Reiniciar página cuando se filtra
  }, [searchTerm, users]);

  // Paginación
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  // Funciones simuladas
  const handleEdit = (user) => {
    alert(`Editar usuario: ${user.name}`);
    // Aquí podrías abrir un formulario/modal para editar
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Deseas eliminar este usuario?")) {
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      setFiltered(updated);
    }
  };

  const handleAddUser = () => {
    alert("Funcionalidad para crear nuevo usuario");
    // Aquí podrías abrir un formulario/modal para registrar
  };

  return (
    <div className="admin-container">
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
            />
          </div>
          <button className="btn-add" onClick={handleAddUser}>
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
                          style={{ borderRadius: "50%" }}
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
                          onClick={() => handleEdit(user)}
                        >
                          <FaUserEdit />
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      No se encontraron usuarios
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

export default Users;
