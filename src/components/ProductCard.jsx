import { useState } from "react";
import { IconCart } from "./icons";
 
export default function ProductCard({ product, onAddToCart, onNavigate }) {
  const [imgHovered, setImgHovered] = useState(false);
 
  // Support both old {image1,image2} and new {images[]} shapes
  const img1 = product.image1 ?? product.images?.[0];
  const img2 = product.image2 ?? product.images?.[1] ?? img1;
 
  const handleCardClick = (e) => {
    // Don't navigate if the cart button was clicked
    if (e.target.closest(".btn-cart-add")) return;
    onNavigate?.(product.id);
  };
 
  return (
    <div className="product-card" onClick={handleCardClick} style={{ cursor: "pointer" }}>
      {product.badge && <span className="product-badge">{product.badge}</span>}
      <div
        className="product-img-wrap"
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
      >
        <img src={img1} alt={product.name} className={`product-img ${imgHovered ? "hidden-img" : "visible-img"}`} />
        <img src={img2} alt={`${product.name} alt`} className={`product-img ${imgHovered ? "visible-img" : "hidden-img"}`} />
      </div>
      <div className="product-info">
        <p className="product-category">{product.category.toUpperCase()}</p>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <button
            className="btn-cart-add"
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            title="Agregar al carrito"
          >
            <IconCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}