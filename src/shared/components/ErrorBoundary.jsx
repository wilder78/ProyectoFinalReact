import React, { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
    // Aquí podrías enviar el error a un servicio de monitoreo como Sentry
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    // Opcional: puedes añadir lógica para resetear el estado de la aplicación
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.errorContainer}>
          <h2 style={styles.title}>¡Algo salió mal!</h2>
          <details style={styles.details}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
          <button onClick={this.handleReset} style={styles.resetButton}>
            Intentar nuevamente
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  errorContainer: {
    padding: "20px",
    margin: "20px",
    border: "1px solid #ff6b6b",
    borderRadius: "4px",
    backgroundColor: "#ffe3e3",
    color: "#ff0000",
  },
  title: {
    color: "#ff0000",
  },
  details: {
    margin: "15px 0",
    whiteSpace: "pre-wrap",
  },
  resetButton: {
    padding: "8px 16px",
    backgroundColor: "#ff6b6b",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
