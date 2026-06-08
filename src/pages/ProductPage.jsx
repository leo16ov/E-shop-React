import { useState } from "react";

export default function ProductPage({ products = [], productId, onAddToCart, setPage }) {
  const product = products.find(p => p.id === productId);

  const [selectedSize,  setSelectedSize]  = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty,           setQty]           = useState(1);
  const [activeImg,     setActiveImg]     = useState(0);

  if (!product) {
    return (
      <main className="product-page">
        <div className="no-results">
          <p>Producto no encontrado.</p>
          <button className="btn" onClick={() => setPage("home")}>Volver</button>
        </div>
      </main>
    );
  }

  // Construye el ítem de carrito conservando imágenes y selección.
  const buildItem = () => ({
    ...product,
    qty,
    selectedSize,
    selectedColor,
    image1: product.images[0],
    image2: product.images[1] || product.images[0],
  });

  const handleAddToCart = () => onAddToCart(buildItem());

  const handleBuyNow = () => {
    onAddToCart(buildItem());
    setPage("checkout");
  };

  const outOfStock = product.stock <= 0;

  return (
    <main className="product-page">
      <button className="back-link" onClick={() => setPage("home")}>← Volver</button>

      <div className="product-detail">
        {/* Galería */}
        <div className="product-gallery">
          <div className="gallery-main">
            <img src={product.images[activeImg]} alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="gallery-thumbs">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  className={`thumb ${i === activeImg ? "active" : ""}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`${product.name} ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-info">
          <p className="product-category">{product.category.toUpperCase()}</p>
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price}</p>
          <p className="product-description">{product.description}</p>

          {product.sizes.length > 0 && (
            <div className="option-group">
              <label>Talle</label>
              <div className="option-list">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`option-btn ${selectedSize === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors.length > 0 && (
            <div className="option-group">
              <label>Color</label>
              <div className="option-list">
                {product.colors.map(c => (
                  <button
                    key={c}
                    title={c}
                    className={`color-swatch ${selectedColor === c ? "active" : ""}`}
                    style={{ background: c }}
                    onClick={() => setSelectedColor(c)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="option-group">
            <label>Cantidad</label>
            <div className="qty-control">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          <div className="product-actions">
            <button className="btn btn-secondary" onClick={handleAddToCart} disabled={outOfStock}>
              Agregar al carrito
            </button>
            <button className="btn btn-primary" onClick={handleBuyNow} disabled={outOfStock}>
              Comprar ahora
            </button>
          </div>
          {outOfStock && <p className="out-of-stock">Sin stock</p>}
        </div>
      </div>
    </main>
  );
}
