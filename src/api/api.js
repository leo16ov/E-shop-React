// src/lib/api.js
// Capa única de acceso al backend. Adapta la respuesta (en español, según la DB)
// a la forma que ya usan los componentes del frontend.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const PLACEHOLDER = "https://placehold.co/600x800?text=Sin+imagen";

// ── Token (persistido en localStorage) ────────────────────────────
const TOKEN_KEY = "elume_token";
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const isLoggedIn = () => !!getToken();

// ── Request genérico con manejo de errores y auth ──────────────────
async function request(path, { method = "GET", body, auth = false, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (auth && getToken()) headers["Authorization"] = `Bearer ${getToken()}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: isForm ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let msg = `Error ${res.status}`;
    try {
      const data = await res.json();
      msg = data.error || msg;
    } catch (_) {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ── Helpers de mapeo ───────────────────────────────────────────────
// Divide la cadena de talles/colores por "," o "-".
const splitList = (s) =>
  s ? s.split(/[,-]/).map((x) => x.trim()).filter(Boolean) : [];

// Convierte un producto del backend a la forma del frontend.
function mapProduct(p) {
  return {
    id: p.id,
    name: p.nombre,
    category: (p.categoria || "").toLowerCase(),
    price: p.precio,
    stock: p.stock,
    description: p.descripcion || "",
    sizes: splitList(p.talles),
    colors: splitList(p.colores),
    images: p.imagenes && p.imagenes.length ? p.imagenes : [PLACEHOLDER],
    badge: null,
  };
}

// ── Productos ──────────────────────────────────────────────────────
export async function getProducts() {
  const data = await request("/products");
  return (data || []).map(mapProduct);
}

export async function getProduct(id) {
  return mapProduct(await request(`/products/${id}`));
}

export async function getCategories() {
  return request("/categories");
}

// Sube una o varias imágenes a un producto (admin).
export async function uploadProductImages(productId, fileList) {
  const form = new FormData();
  Array.from(fileList).forEach((f) => form.append("images", f));
  return request(`/products/${productId}/images`, {
    method: "POST",
    body: form,
    auth: true,
    isForm: true,
  });
}

// ── Auth ───────────────────────────────────────────────────────────
export async function login({ email, password }) {
  const data = await request("/auth/login", {
    method: "POST",
    body: { email, contrasena: password },
  });
  if (data.token) setToken(data.token);
  return data.user; // {id, nombre, apellido, email, rol}
}

export async function register({ nombre, apellido, email, password }) {
  // El backend crea el usuario pero no devuelve token: hacemos login a continuación.
  await request("/auth/signup", {
    method: "POST",
    body: { nombre, apellido, email, contrasena: password },
  });
  return login({ email, password });
}

export async function getProfile() {
  return request("/auth/profile", { auth: true });
}

export const googleLoginUrl = () => `${API_URL}/auth/google`;

// ── Checkout / Órdenes ─────────────────────────────────────────────
export async function createCheckout(payload) {
  return request("/checkout", { method: "POST", body: payload, auth: true });
}

export async function getOrders() {
  return request("/orders", { auth: true });
}
