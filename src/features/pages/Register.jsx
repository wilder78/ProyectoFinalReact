import React, { useState } from "react";
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
  const [formData, setFormData] = useState({
    documento: "",
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Usuario registrado:", formData);
      setIsSubmitting(false);
      setUserRegistered(true); // cambia la vista al swiper
    }, 1500);
  };

  return (
    <div className="register-container">
      <Swiper spaceBetween={50} allowTouchMove={false}>
        <SwiperSlide>
          {!userRegistered ? (
            <div className="register-card">
              <div className="register-header">
                <h2>Crear Cuenta</h2>
                <p>Únete a nuestra comunidad tecnológica</p>
              </div>

              <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                  <label htmlFor="documento">
                    <FaIdCard className="input-icon" />
                    <span>Documento de Identidad</span>
                  </label>
                  <input
                    type="text"
                    id="documento"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                    placeholder="Ingrese su número de documento"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nombres">
                    <FaUser className="input-icon" />
                    <span>Nombres</span>
                  </label>
                  <input
                    type="text"
                    id="nombres"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleChange}
                    placeholder="Ingrese sus nombres"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="apellidos">
                    <FaUser className="input-icon" />
                    <span>Apellidos</span>
                  </label>
                  <input
                    type="text"
                    id="apellidos"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleChange}
                    placeholder="Ingrese sus apellidos"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <FaEnvelope className="input-icon" />
                    <span>Correo Electrónico</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <FaLock className="input-icon" />
                    <span>Contraseña</span>
                  </label>
                  <div className="password-input">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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
          ) : (
            <div className="register-card text-center">
              <h2>¡Registro Exitoso!</h2>
              <p>
                Bienvenido/a, <strong>{formData.nombres}</strong>
              </p>
              <p>Tu usuario ha sido registrado correctamente.</p>
              <p>
                Email: <strong>{formData.email}</strong>
              </p>
              <p>¡Explora nuestra tienda ahora!</p>
            </div>
          )}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Register;
