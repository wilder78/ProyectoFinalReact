import React from "react";
import { Link } from "react-router-dom";

// Datos de las categorías (podrían venir de una API)
const categories = [
  {
    id: 1,
    name: "Laptops",
    description: "Los mejores equipos para trabajo y gaming",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45",
    count: 25,
  },
  {
    id: 2,
    name: "Smartphones",
    description: "Dispositivos móviles de última generación",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    count: 42,
  },
  {
    id: 3,
    name: "Periféricos",
    description: "Teclados, ratones y accesorios para PC",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    count: 18,
  },
  {
    id: 4,
    name: "Audio",
    description: "Audífonos, parlantes y equipos de sonido",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    count: 31,
  },
  {
    id: 5,
    name: "Smart Home",
    description: "Tecnología para tu hogar inteligente",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827",
    count: 15,
  },
  {
    id: 6,
    name: "Gaming",
    description: "Equipos y accesorios para gamers",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
    count: 27,
  },
];

function CategoriesPage() {
  return (
    <div className="categories-container">
      <header className="categories-header">
        <h1>Nuestras Categorías de Productos</h1>
        <p>Explora nuestra selección de tecnología de vanguardia</p>
      </header>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            to={`/productos?category=${category.id}`}
            key={category.id}
            className="category-card"
          >
            <div
              className="category-image"
              style={{ backgroundImage: `url(${category.image})` }}
            >
              <span className="product-count">{category.count} productos</span>
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <button className="explore-btn">Explorar</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
