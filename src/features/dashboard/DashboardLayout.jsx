import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";

function DashboardLayout() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate("/"); // Redirige a la página de inicio
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Panel Admin</h2>
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link to="/dashboard/users">Usuarios</Link>
            </li>
            <li>
              <Link to="/dashboard/clients">Clientes</Link>
            </li>
            <li>
              <Link to="/dashboard/products">Productos</Link>
            </li>
          </ul>
        </nav>

        <button className="exit-btn" onClick={handleExit}>
          Salir al inicio
        </button>
      </aside>

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
