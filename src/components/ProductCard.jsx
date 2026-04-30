import { useState } from "react";
import { IconCart } from "./icons";

export default function ProductCard({ product, onAddToCart }) {
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <div className="product-card">
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <div
        className="product-img-wrap"
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <img src={product.image1} alt={product.name} className={`product-img ${imgHovered ? "hidden-img" : "visible-img"}`} />
        <img src={product.image2} alt={`${product.name} alt`} className={`product-img ${imgHovered ? "visible-img" : "hidden-img"}`} />
      </div>
      <div className="product-info">
        <p className="product-category">{product.category.toUpperCase()}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button className="btn-cart-add" onClick={() => onAddToCart(product)} title="Agregar al carrito">
            <IconCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}