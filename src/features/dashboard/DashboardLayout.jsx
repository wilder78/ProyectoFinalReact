import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./dashboard.css";

function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleExit = () => {
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2 className="dashboard-title">
            <i className="fas fa-shield-alt"></i> Panel Admin
          </h2>
        </div>
        <nav className="dashboard-nav">
          <ul>
            <li>
              <Link
                to="/dashboard/users"
                className={
                  location.pathname === "/dashboard/users" ? "active" : ""
                }
              >
                <i className="fas fa-users"></i> Usuarios
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/products"
                className={
                  location.pathname === "/dashboard/products" ? "active" : ""
                }
              >
                <i className="fas fa-box-open"></i> Productos
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className={
                  location.pathname === "/dashboard/settings" ? "active" : ""
                }
              >
                <i className="fas fa-cog"></i> Configuración
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button className="exit-btn" onClick={handleExit}>
            <i className="fas fa-sign-out-alt"></i> Salir al inicio
          </button>
        </div>
      </aside>
      <main className="dashboard-content">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
