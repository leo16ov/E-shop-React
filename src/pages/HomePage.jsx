import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/data";
import Hero from "../components/Hero";

export default function HomePage({
  products = [],
  loading,
  loadError,
  onAddToCart,
  search,
  activeCategory,
  setPage,
  setProductId,
}) {
  const filtered = products.filter(p => {
    const matchCat    = activeCategory === "todos" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
                     || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleNavigate = (id) => {
    setProductId(id);
    setPage("product");
  };

  return (
    <main>
      {!search && activeCategory === "todos" && <Hero setPage={setPage} />}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">
            {search
              ? `Resultados: "${search}"`
              : activeCategory === "todos"
                ? "Todos los Productos"
                : CATEGORIES.find(c => c.key === activeCategory)?.label}
          </h2>
          <p className="section-count">{filtered.length} artículos</p>
        </div>

        {loading ? (
          <div className="no-results"><p>Cargando productos…</p></div>
        ) : loadError ? (
          <div className="no-results"><p>No se pudieron cargar los productos: {loadError}</p></div>
        ) : filtered.length === 0 ? (
          <div className="no-results"><p>No se encontraron productos.</p></div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
