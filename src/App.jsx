import { useState } from "react";

//import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import OrdersPage from "./pages/OrdersPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";


export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("todos");

  const addToCart = (p) => {
    setCart(c => {
      const existing = c.find(i => i.id === p.id);
      if (existing) return c.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...p, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(c => c.reduce((acc, i) => {
      if (i.id !== id) return [...acc, i];
      const newQty = i.qty + delta;
      return newQty > 0 ? [...acc, { ...i, qty: newQty }] : acc;
    }, []));
  };

  const renderPage = () => {
    switch (page) {
      case "home":     return <HomePage cart={cart} onAddToCart={addToCart} search={search} activeCategory={activeCategory} />;
      case "login":    return <LoginPage setPage={setPage} onLogin={setUser} />;
      case "register": return <RegisterPage setPage={setPage} onLogin={setUser} />;
      case "orders":   return <OrdersPage user={user} setPage={setPage} />;
      case "contact":  return <ContactPage />;
      default:         return <HomePage cart={cart} onAddToCart={addToCart} search={search} activeCategory={activeCategory} />;
    }
  };

  return (
    <div className="app-root">
      <Header
        page={page} setPage={setPage}
        cart={cart} onUpdateQty={updateQty}
        user={user} onLogout={() => setUser(null)}
        search={search} setSearch={setSearch}
        activeCategory={activeCategory} setActiveCategory={setActiveCategory}
      />
      {renderPage()}
      <Footer />
    </div>
  );
}

