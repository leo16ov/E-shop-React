import ProductCard from "../components/ProductCard";
import { PRODUCTS } from "../data/data";
import { CATEGORIES } from "../data/data";
import Hero from "../components/Hero";

export default function HomePage({ cart, onAddToCart, search, activeCategory }) {
  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === "todos" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main>
      {!search && activeCategory === "todos" && <Hero setPage={() => {}} />}
      <section className="products-section">
        <div className="section-header">
          <h2 className="section-title">
            {search ? `Resultados: "${search}"` : activeCategory === "todos" ? "Todos los Productos" : CATEGORIES.find(c => c.key === activeCategory)?.label}
          </h2>
          <p className="section-count">{filtered.length} artículos</p>
        </div>
        {filtered.length === 0 ? (
          <div className="no-results">
            <p>No se encontraron productos.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
