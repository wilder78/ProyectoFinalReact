import { useState } from "react";
import Swal from "sweetalert2";

export function useRegisterForm(navigate) {
  const [formData, setFormData] = useState({
    documento: "",
    nombres: "",
    apellidos: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  // Validaciones individuales
  const validations = {
    documento: (value) => {
      if (!/^\d{8,11}$/.test(value)) {
        showAlert(
          "documento",
          "Documento inválido",
          "Debe tener entre 8 y 11 dígitos numéricos."
        );
        return false;
      }
      resetAlert("documento");
      return true;
    },

    nombres: (value) => {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,35}$/.test(value)) {
        showAlert(
          "nombres",
          "Nombre inválido",
          "Solo letras y espacios (máximo 35 caracteres). No uses @ - * +."
        );
        return false;
      }
      resetAlert("nombres");
      return true;
    },

    apellidos: (value) => {
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,35}$/.test(value)) {
        showAlert(
          "apellidos",
          "Apellido inválido",
          "Solo letras y espacios (máximo 35 caracteres). No uses @ - * +."
        );
        return false;
      }
      resetAlert("apellidos");
      return true;
    },

    email: (value) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        showAlert(
          "email",
          "Correo inválido",
          "Debe ser un correo electrónico válido (ejemplo@dominio.com)."
        );
        return false;
      }
      resetAlert("email");
      return true;
    },

    password: (value) => {
      const hasUppercase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSymbol = /[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]/.test(value);
      const hasMinLength = value.length >= 8;

      if (!(hasUppercase && hasNumber && hasSymbol && hasMinLength)) {
        showAlert(
          "password",
          "Contraseña débil",
          `Debe tener al menos:<br/>
          • 8 caracteres<br/>
          • 1 mayúscula<br/>
          • 1 número<br/>
          • 1 símbolo como ! @ # $ % & * - / etc.`
        );
        return false;
      }
      resetAlert("password");
      return true;
    },
  };

  const handleChange = {
    documento: (e) => {
      const value = e.target.value;
      if (!/^\d*$/.test(value)) return;
      setFormData((prev) => ({ ...prev, documento: value }));
      validations.documento(value);
    },

    nombres: (e) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, nombres: value }));
      validations.nombres(value);
    },

    apellidos: (e) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, apellidos: value }));
      validations.apellidos(value);
    },

    email: (e) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, email: value }));
      validations.email(value);
    },

    password: (e) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, password: value }));
      validations.password(value);
    },
  };

  const validateForm = () => {
    return (
      validations.documento(formData.documento) &&
      validations.nombres(formData.nombres) &&
      validations.apellidos(formData.apellidos) &&
      validations.email(formData.email) &&
      validations.password(formData.password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Formulario inválido",
        text: "Por favor complete todos los campos correctamente.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular llamada a API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Guardar en localStorage
      const existingUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
      existingUsers.push(formData);
      localStorage.setItem("usuarios", JSON.stringify(existingUsers));

      await Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: `Bienvenido/a, ${formData.nombres}`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al registrar. Por favor intente nuevamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
