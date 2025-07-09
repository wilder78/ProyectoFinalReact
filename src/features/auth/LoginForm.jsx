import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import "./authForm.css";

function LoginForm() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Recuperar usuarios registrados del localStorage
    const storedUsers = localStorage.getItem("usuarios");
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    // Buscar coincidencia por email y contraseña
    const userFound = users.find(
      (user) =>
        user.email.toLowerCase() === credentials.email.toLowerCase() &&
        user.password === credentials.password
    );

    if (userFound) {
      // Guardar sesión (opcional)
      localStorage.setItem("sesion", JSON.stringify(userFound));

      // Mostrar bienvenida
      Swal.fire({
        icon: "success",
        title: "Bienvenido/a",
        text: `Hola, ${userFound.nombres}`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirigir tras un pequeño delay
      setTimeout(() => navigate("/perfil"), 2200);
    } else {
      Swal.fire({
        icon: "error",
        title: "Credenciales inválidas",
        text: "Correo o contraseña incorrectos.",
      });
    }
  };

  return (
    <div className="login3-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className="login3-form">
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope /> Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <FaLock /> Contraseña
          </label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Ocultar" : "Mostrar"}
            </button>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <FaSignInAlt /> Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
