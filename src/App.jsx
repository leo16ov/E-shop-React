import { useState, useEffect } from "react";
import Header       from "./components/Header";
import Footer       from "./components/Footer";
import HomePage     from "./pages/HomePage";
import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage   from "./pages/OrdersPage";
import ContactPage  from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage  from "./pages/ProductPage";
import { getProducts, getProfile, getToken, setToken, clearToken } from "./lib/api";

export default function App() {
  const [page,           setPage]           = useState("home");
  const [productId,      setProductId]      = useState(null);
  const [cart,           setCart]           = useState([]);
  const [user,           setUser]           = useState(null);
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  // Productos traídos del backend
  const [products,  setProducts]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [loadError, setLoadError] = useState("");

  // ── Carga inicial de productos ──────────────────────────────────────────────
  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(e => setLoadError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // ── Sesión: retorno de Google (?token=) o token ya guardado ─────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromOAuth = params.get("token");

    if (tokenFromOAuth) {
      setToken(tokenFromOAuth);
      // Limpia la URL para no dejar el token a la vista
      window.history.replaceState({}, "", window.location.pathname);
    }

    if (getToken()) {
      getProfile()
        .then(p => setUser({ name: p.email?.split("@")[0] || "Usuario", email: p.email }))
        .catch(() => clearToken());
    }
  }, []);

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const addToCart = (p) => {
    setCart(c => {
      const existing = c.find(i => i.id === p.id);
      if (existing) return c.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(c =>
      c.reduce((acc, i) => {
        if (i.id !== id) return [...acc, i];
        const newQty = i.qty + delta;
        return newQty > 0 ? [...acc, { ...i, qty: newQty }] : acc;
      }, [])
    );
  };

  const handleOrderComplete = () => setCart([]);
  const handleLogout = () => { clearToken(); setUser(null); };

  // ── Page routing ────────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <HomePage
            products={products}
            loading={loading}
            loadError={loadError}
            onAddToCart={addToCart}
            search={search}
            activeCategory={activeCategory}
            setPage={setPage}
            setProductId={setProductId}
          />
        );
      case "product":
        return (
          <ProductPage
            products={products}
            productId={productId}
            onAddToCart={addToCart}
            setPage={setPage}
          />
        );
      case "login":
        return <LoginPage setPage={setPage} onLogin={setUser} />;
      case "register":
        return <RegisterPage setPage={setPage} onLogin={setUser} />;
      case "orders":
        return <OrdersPage user={user} setPage={setPage} />;
      case "contact":
        return <ContactPage />;
      case "checkout":
        return (
          <CheckoutPage
            cart={cart}
            user={user}
            setPage={setPage}
            onOrderComplete={handleOrderComplete}
          />
        );
      default:
        return (
          <HomePage
            products={products}
            loading={loading}
            loadError={loadError}
            onAddToCart={addToCart}
            search={search}
            activeCategory={activeCategory}
            setPage={setPage}
            setProductId={setProductId}
          />
        );
    }
  };

  return (
    <div className="app-root">
      <Header
        page={page}
        setPage={setPage}
        cart={cart}
        onUpdateQty={updateQty}
        user={user}
        onLogout={handleLogout}
        search={search}
        setSearch={setSearch}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}
