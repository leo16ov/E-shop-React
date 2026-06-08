import { useState } from "react";
import { PRODUCTS } from "../data/data";
import { IconCart, IconChevronLeft, IconChevronRight } from "../components/icons";

// ─── Image carousel ───────────────────────────────────────────────────────────
function Carousel({ images, name }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = (e) => { e?.stopPropagation(); setCurrent(i => (i - 1 + images.length) % images.length); };
  const next = (e) => { e?.stopPropagation(); setCurrent(i => (i + 1) % images.length); };

  return (
    <>
      <div className="carousel-wrap">
        {/* Thumbnail column */}
        <div className="carousel-thumbs">
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`carousel-thumb-btn ${idx === current ? "thumb-active" : ""}`}
              onClick={() => setCurrent(idx)}
            >
              <img src={img} alt={`${name} ${idx + 1}`} />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="carousel-main" onClick={() => setLightbox(true)}>
          <img
            key={current}
            src={images[current]}
            alt={`${name} vista ${current + 1}`}
            className="carousel-main-img"
          />
          {images.length > 1 && (
            <>
              <button className="carousel-arrow carousel-arrow-left"  onClick={prev}><IconChevronLeft /></button>
              <button className="carousel-arrow carousel-arrow-right" onClick={next}><IconChevronRight /></button>
            </>
          )}
          <span className="carousel-counter">{current + 1} / {images.length}</span>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(false)}>
          <button className="lightbox-close" onClick={() => setLightbox(false)}>✕</button>
          <button className="lightbox-arrow lightbox-left"  onClick={prev}><IconChevronLeft size={32} /></button>
          <img
            src={images[current]}
            alt={`${name} ampliada`}
            className="lightbox-img"
            onClick={e => e.stopPropagation()}
          />
          <button className="lightbox-arrow lightbox-right" onClick={next}><IconChevronRight size={32} /></button>
          <span className="lightbox-counter">{current + 1} / {images.length}</span>
        </div>
      )}
    </>
  );
}

// ─── Product page ─────────────────────────────────────────────────────────────
export default function ProductPage({ productId, onAddToCart, setPage }) {
  const product = PRODUCTS.find(p => p.id === productId);

  const [selectedSize,  setSelectedSize]  = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [qty,           setQty]           = useState(1);
  const [addedMsg,      setAddedMsg]      = useState(false);

  if (!product) {
    return (
      <main className="auth-page">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 300, marginBottom: 8 }}>Producto no encontrado</h2>
          <button className="btn-auth" onClick={() => setPage("home")}>Volver a la tienda</button>
        </div>
      </main>
    );
  }

  const stockLabel = product.stock === 0
    ? "Sin stock"
    : product.stock <= 5
      ? `¡Solo quedan ${product.stock}!`
      : `${product.stock} disponibles`;

  const stockColor = product.stock === 0 ? "#c33" : product.stock <= 5 ? "#b5841a" : "#4caf50";

  const handleAddToCart = () => {
    onAddToCart({ ...product, image1: product.images[0], image2: product.images[1] ?? product.images[0] });
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  const handleBuyNow = () => {
    onAddToCart({ ...product, image1: product.images[0], image2: product.images[1] ?? product.images[0] });
    setPage("checkout");
  };

  const changeQty = (delta) => {
    setQty(q => Math.min(product.stock, Math.max(1, q + delta)));
  };

  return (
    <main className="product-page">
      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <button className="breadcrumb-link" onClick={() => setPage("home")}>Inicio</button>
        <span className="breadcrumb-sep">›</span>
        <button className="breadcrumb-link" onClick={() => setPage("home")}>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</button>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-detail-grid">

        {/* ── LEFT: Carousel ─────────────────────────────────────────────── */}
        <div className="product-detail-left">
          <Carousel images={product.images} name={product.name} />
        </div>

        {/* ── RIGHT: Info panel ──────────────────────────────────────────── */}
        <div className="product-detail-right">
          {product.badge && <span className="pd-badge">{product.badge}</span>}

          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-price-row">
            <span className="pd-price">${product.price.toFixed(2)}</span>
            <span className="pd-price-installments">
              6 cuotas de ${(product.price / 6).toFixed(2)}
            </span>
          </div>

          {/* Stock */}
          <div className="pd-stock">
            <span className="pd-stock-dot" style={{ background: stockColor }} />
            <span style={{ color: stockColor, fontWeight: 500, fontSize: 13 }}>{stockLabel}</span>
          </div>

          <div className="pd-divider" />

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="pd-section">
              <p className="pd-label">
                Color
                {selectedColor && (
                  <span className="pd-selection-hint"> — {selectedColor}</span>
                )}
              </p>
              <div className="pd-colors">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    className={`pd-color-btn ${selectedColor === color ? "pd-color-active" : ""}`}
                    style={{ background: color }}
                    onClick={() => setSelectedColor(color === selectedColor ? null : color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="pd-section">
              <p className="pd-label">
                Talle
                {selectedSize && (
                  <span className="pd-selection-hint"> — {selectedSize}</span>
                )}
              </p>
              <div className="pd-sizes">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`pd-size-btn ${selectedSize === size ? "pd-size-active" : ""}`}
                    onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="pd-section">
            <p className="pd-label">Cantidad</p>
            <div className="pd-qty-row">
              <div className="pd-qty-ctrl">
                <button className="pd-qty-btn" onClick={() => changeQty(-1)} disabled={qty <= 1}>−</button>
                <span className="pd-qty-num">{qty}</span>
                <button className="pd-qty-btn" onClick={() => changeQty(1)} disabled={qty >= product.stock}>+</button>
              </div>
              <span className="pd-qty-hint">(máx. {product.stock})</span>
            </div>
          </div>

          <div className="pd-divider" />

          {/* Actions */}
          <div className="pd-actions">
            <button
              className="btn-buy-now"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              Comprar ahora
            </button>
            <button
              className={`btn-add-cart-pd ${addedMsg ? "btn-added" : ""}`}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <IconCart size={18} />
              {addedMsg ? "¡Agregado!" : "Agregar al carrito"}
            </button>
          </div>

          {product.stock === 0 && (
            <p className="pd-no-stock-msg">Este producto está agotado actualmente.</p>
          )}

          {/* Shipping info */}
          <div className="pd-shipping-info">
            <div className="pd-shipping-item">
              <span>🚚</span>
              <span>Envío gratis a todo el país en compras +$99</span>
            </div>
            <div className="pd-shipping-item">
              <span>↩️</span>
              <span>Devolución gratis dentro de los 30 días</span>
            </div>
            <div className="pd-shipping-item">
              <span>🏪</span>
              <span>Retiro en tienda disponible sin costo</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Description (full width below) ──────────────────────────────── */}
      <div className="pd-description-section">
        <h2 className="pd-desc-title">Descripción del producto</h2>
        <p className="pd-desc-text">{product.description}</p>
      </div>
    </main>
  );
}
