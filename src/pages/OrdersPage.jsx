import { IconBag } from "../components/icons";

export default function OrdersPage({ user, setPage }) {
  if (!user) return (
    <main className="auth-page">
      <div className="auth-card" style={{ textAlign: "center" }}>
        <IconBag size={48} />
        <h2 style={{ margin: "1rem 0 0.5rem" }}>Mis Compras</h2>
        <p style={{ color: "#888", marginBottom: "1.5rem" }}>Iniciá sesión para ver tus compras.</p>
        <button className="btn-auth" onClick={() => setPage("login")}>Iniciar sesión</button>
      </div>
    </main>
  );
  return (
    <main className="content-page">
      <h2 className="page-title">Mis Compras</h2>
      <div className="empty-page">
        <IconBag size={64} />
        <p>Todavía no realizaste ninguna compra.</p>
        <button className="btn-primary" onClick={() => setPage("home")}>Ir a la tienda</button>
      </div>
    </main>
  );
}
