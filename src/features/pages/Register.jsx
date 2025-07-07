import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "./hooksPages/useRegisterForm";
import {
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./register.css";

function Register() {
  const navigate = useNavigate();
  const { formData, isSubmitting, handleChange, handleSubmit } =
    useRegisterForm(navigate);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="register-container">
      <Swiper spaceBetween={50} allowTouchMove={false}>
        <SwiperSlide>
          <div className="register-card">
            <div className="register-header">
              <h2>Crear Cuenta</h2>
              <p>Únete a nuestra comunidad tecnológica</p>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              {[
                {
                  label: "Documento de Identidad",
                  icon: <FaIdCard />,
                  name: "documento",
                  type: "text",
                  placeholder: "Ingrese su número de documento",
                },
                {
                  label: "Nombres",
                  icon: <FaUser />,
                  name: "nombres",
                  type: "text",
                  placeholder: "Ingrese sus nombres",
                },
                {
                  label: "Apellidos",
                  icon: <FaUser />,
                  name: "apellidos",
                  type: "text",
                  placeholder: "Ingrese sus apellidos",
                },
                {
                  label: "Correo Electrónico",
                  icon: <FaEnvelope />,
                  name: "email",
                  type: "email",
                  placeholder: "ejemplo@correo.com",
                },
              ].map(({ label, icon, name, type, placeholder }) => (
                <div className="form-group" key={name}>
                  <label htmlFor={name}>
                    {icon} <span>{label}</span>
                  </label>
                  <input
                    id={name}
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange[name]}
                    placeholder={placeholder}
                    required
                  />
                </div>
              ))}

              <div className="form-group">
                <label htmlFor="password">
                  <FaLock /> <span>Contraseña</span>
                </label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange.password}
                    placeholder="Cree una contraseña segura"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="spinner"></span>
                ) : (
                  <>
                    <FaSignInAlt /> Registrarse
                  </>
                )}
              </button>
            </form>

            <div className="register-footer">
              <p>
                ¿Ya tienes una cuenta? <a href="/login">Inicia sesión aquí</a>
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Register;
