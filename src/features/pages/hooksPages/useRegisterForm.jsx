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

  const handleChange = {
    documento: (e) => {
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
    },

    nombres: (e) => {
      const value = e.target.value;
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
        showAlert(
          "nombres",
          "Nombre inválido",
          "Solo letras y espacios. No uses @ - * +."
        );
        return;
      }
      if (value.length > 35) {
        showAlert("nombres", "Nombre muy largo", "Máximo 35 caracteres.");
        return;
      }
      setFormData((prev) => ({ ...prev, nombres: value }));
      resetAlert("nombres");
    },

    apellidos: (e) => {
      const value = e.target.value;
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
        showAlert(
          "apellidos",
          "Apellido inválido",
          "Solo letras y espacios. No uses @ - * +."
        );
        return;
      }
      if (value.length > 35) {
        showAlert("apellidos", "Apellido muy largo", "Máximo 35 caracteres.");
        return;
      }
      setFormData((prev) => ({ ...prev, apellidos: value }));
      resetAlert("apellidos");
    },

    email: (e) => {
      const value = e.target.value;
      if (value && !value.includes("@")) {
        showAlert("email", "Correo inválido", "Debe contener el símbolo '@'.");
      } else {
        resetAlert("email");
      }
      setFormData((prev) => ({ ...prev, email: value }));
    },

    password: (e) => {
      const value = e.target.value;
      const isValid =
        /[A-Z]/.test(value) &&
        /\d/.test(value) &&
        /[*\/\-+]/.test(value) &&
        value.length >= 8;

      if (!isValid && value.length > 0) {
        showAlert(
          "password",
          "Contraseña débil",
          "Debe tener al menos:<br/>• 8 caracteres<br/>• 1 mayúscula<br/>• 1 número<br/>• 1 símbolo como * / - +"
        );
      } else if (isValid) {
        resetAlert("password");
      }
      setFormData((prev) => ({ ...prev, password: value }));
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      // Guardar en localStorage
      const existingUsers = JSON.parse(localStorage.getItem("usuarios")) || [];
      existingUsers.push(formData);
      localStorage.setItem("usuarios", JSON.stringify(existingUsers));

      setIsSubmitting(false);

      Swal.fire({
        icon: "success",
        title: "¡Registro exitoso!",
        text: `Bienvenido/a, ${formData.nombres}`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirigir al inicio
      setTimeout(() => navigate("/"), 2200);
    }, 1500);
  };

  return {
    formData,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
