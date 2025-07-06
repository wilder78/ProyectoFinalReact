import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaLock,
  FaSignInAlt,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
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
  const navigate = useNavigate();

  const [alertShown, setAlertShown] = useState({
    documento: false,
    nombres: false,
    apellidos: false,
    email: false,
    password: false,
  });

  const showAlert = (field, title, text) => {
    if (!alertShown[field]) {
      Swal.fire({ icon: "warning", title, html: text });
      setAlertShown((prev) => ({ ...prev, [field]: true }));
    }
  };

  const resetAlert = (field) => {
    setAlertShown((prev) => ({ ...prev, [field]: false }));
  };

  const handleDocumentoChange = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    setFormData((prev) => ({ ...prev, documento: value }));

    if ((value.length > 0 && value.length < 8) || value.length > 11) {
      showAlert(
        "documento",
        "Documento inválido",
        "Debe tener entre 9 y 11 dígitos numéricos."
      );
    } else {
      resetAlert("documento");
    }
  };

  const handleNombresChange = (e) => {
    const value = e.target.value;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      showAlert(
        "nombres",
        "Nombre inválido",
        "Solo se permiten letras y espacios. No uses símbolos como @ - * +."
      );
      return;
    }

    if (value.length > 35) {
      showAlert(
        "nombres",
        "Nombre demasiado largo",
        "Máximo 35 caracteres permitidos."
      );
      return;
    }

    setFormData((prev) => ({ ...prev, nombres: value }));
    resetAlert("nombres");
  };

  const handleApellidosChange = (e) => {
    const value = e.target.value;
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
      showAlert(
        "apellidos",
        "Apellido inválido",
        "Solo se permiten letras y espacios. No uses símbolos como @ - * +."
      );
      return;
    }

    if (value.length > 35) {
      showAlert(
        "apellidos",
        "Apellido demasiado largo",
        "Máximo 35 caracteres permitidos."
      );
      return;
    }

    setFormData((prev) => ({ ...prev, apellidos: value }));
    resetAlert("apellidos");
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    if (value && !value.includes("@")) {
      showAlert(
        "email",
        "Correo inválido",
        "El correo electrónico debe contener el símbolo '@'."
      );
    } else {
      resetAlert("email");
    }
    setFormData((prev) => ({ ...prev, email: value }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;

    const isValid =
      /[A-Z]/.test(value) && // mayúscula
      /\d/.test(value) && // número
      /[*\/\-+]/.test(value) && // símbolo permitido
      value.length >= 8;

    if (!isValid && value.length > 0) {
      showAlert(
        "password",
        "Contraseña débil",
        "Debe contener al menos:<br/>• 8 caracteres<br/>• 1 letra mayúscula<br/>• 1 número<br/>• 1 símbolo como <b>* / - +</b>"
      );
    } else if (isValid) {
      resetAlert("password");
    }

    setFormData((prev) => ({ ...prev, password: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Usuario registrado:", formData);

      // ✅ Guardar en localStorage
      const existingUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
      existingUsers.push(formData);
      localStorage.setItem("usuarios", JSON.stringify(existingUsers));

      setIsSubmitting(false);
      setUserRegistered(true);

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: `Bienvenido/a, ${formData.nombres}`,
        timer: 2000,
        showConfirmButton: false,
      });

      // ✅ Redireccionar al inicio
      setTimeout(() => {
        window.location.href = "http://localhost:5173/";
      }, 2200);
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
                    onChange={handleDocumentoChange}
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
                    onChange={handleNombresChange}
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
                    onChange={handleApellidosChange}
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
                    onChange={handleEmailChange}
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
                      onChange={handlePasswordChange}
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
