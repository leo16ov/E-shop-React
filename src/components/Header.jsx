import { useState, useEffect, useRef } from "react";
import { IconCart, IconUser, IconSearch, IconHome, IconBag, IconMsg, IconMenu } from "./icons";
import {CATEGORIES} from "../data/data";
import CartDropdown from "./CartDropdown";

export default function Header({
  page, setPage, cart, onUpdateQty, user, onLogout, search, setSearch, activeCategory, setActiveCategory
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const cartRef = useRef(null);
  const cartTotal = cart.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const handler = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="site-header">
      {/* Top bar */}
      <div className="header-top">
        <button className="logo-btn" onClick={() => setPage("home")}>
          <span className="logo-text">ÉLUME</span>
          <span className="logo-sub">fashion</span>
        </button>

        {/* Search */}
        <div className="search-wrap">
          <span className="search-icon"><IconSearch /></span>
          <input
            className="search-input"
            type="text"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage("home"); }}
          />
        </div>

        {/* Nav actions */}
        <nav className="nav-actions">
          <button className={`nav-btn ${page === "home" ? "active" : ""}`} onClick={() => setPage("home")} title="Inicio">
            <IconHome size={20} />
            <span className="nav-label">Inicio</span>
          </button>
          <button className={`nav-btn ${page === "orders" ? "active" : ""}`} onClick={() => setPage("orders")} title="Mis compras">
            <IconBag size={20} />
            <span className="nav-label">Compras</span>
          </button>
          <button className={`nav-btn ${page === "contact" ? "active" : ""}`} onClick={() => setPage("contact")} title="Contáctenos">
            <IconMsg size={20} />
            <span className="nav-label">Contacto</span>
          </button>

          {/* Cart */}
          <div className="cart-wrap" ref={cartRef}>
            <button className="nav-btn cart-btn" onClick={() => setCartOpen(o => !o)} title="Carrito">
              <span className="cart-icon-wrap">
                <IconCart size={20} />
                {cartTotal > 0 && <span className="cart-badge">{cartTotal}</span>}
              </span>
              <span className="nav-label">Carrito</span>
            </button>
            {cartOpen && <CartDropdown cart={cart} onUpdateQty={onUpdateQty} onClose={() => setCartOpen(false)} />}
          </div>

          {/* Account */}
          <button
            className={`nav-btn ${page === "login" || page === "register" ? "active" : ""}`}
            onClick={() => user ? onLogout() : setPage("login")}
            title={user ? `${user.name} (cerrar sesión)` : "Cuenta"}
          >
            <IconUser size={20} />
            <span className="nav-label">{user ? user.name.split(" ")[0] : "Cuenta"}</span>
          </button>

          <button className="nav-btn mobile-menu-btn" onClick={() => setMenuOpen(o => !o)}>
            <IconMenu />
          </button>
        </nav>
      </div>

      {/* Category bar */}
      <div className={`cat-bar ${menuOpen ? "open" : ""}`}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`cat-btn ${activeCategory === cat.key ? "cat-active" : ""}`}
            onClick={() => { setActiveCategory(cat.key); setPage("home"); setMenuOpen(false); }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </header>
  );
}