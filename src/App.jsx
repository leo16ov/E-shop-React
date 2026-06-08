import { useState } from "react";
import Header       from "./components/Header";
import Footer       from "./components/Footer";
import HomePage     from "./pages/HomePage";
import LoginPage    from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage   from "./pages/OrdersPage";
import ContactPage  from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage  from "./pages/ProductPage";

export default function App() {
  const [page,           setPage]           = useState("home");
  const [productId,      setProductId]      = useState(null);
  const [cart,           setCart]           = useState([]);
  const [user,           setUser]           = useState(null);
  const [search,         setSearch]         = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

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

  // ── Page routing ────────────────────────────────────────────────────────────
  const renderPage = () => {
    switch (page) {
      case "home":
        return (
          <HomePage
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
            setPage={setPage}
            onOrderComplete={handleOrderComplete}
          />
        );
      default:
        return (
          <HomePage
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
        onLogout={() => setUser(null)}
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