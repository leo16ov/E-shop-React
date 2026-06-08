import { useState } from "react";
 
// ─── Formatters ───────────────────────────────────────────────────────────────
function formatPostal(raw) {
  return raw.replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
}
 
// Argentine phone: up to 15 digits, allows leading +
function formatPhone(raw) {
  const digits = raw.replace(/[^\d]/g, "").slice(0, 13);
  return raw.startsWith("+") ? "+" + digits : digits;
}
 
// Argentine DNI: 7–8 digits
function formatDni(raw) {
  return raw.replace(/\D/g, "").slice(0, 8);
}
 
// ─── Delivery form ────────────────────────────────────────────────────────────
function DeliveryForm({ form, onChange, errors }) {
  return (
    <div className="delivery-form">
      {/* Street + number on one row */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Calle</label>
          <input
            className={`form-input ${errors.street ? "input-error" : ""}`}
            type="text"
            placeholder="Av. Corrientes"
            value={form.street}
            onChange={e => onChange("street", e.target.value)}
          />
          {errors.street && <span className="field-error">{errors.street}</span>}
        </div>
        <div className="form-group form-group--narrow">
          <label className="form-label">Número</label>
          <input
            className={`form-input ${errors.number ? "input-error" : ""}`}
            type="text"
            placeholder="1234"
            value={form.number}
            onChange={e => onChange("number", e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
          {errors.number && <span className="field-error">{errors.number}</span>}
        </div>
      </div>
 
      <div className="form-group">
        <label className="form-label">Ciudad</label>
        <input
          className={`form-input ${errors.city ? "input-error" : ""}`}
          type="text"
          placeholder="Buenos Aires"
          value={form.city}
          onChange={e => onChange("city", e.target.value)}
        />
        {errors.city && <span className="field-error">{errors.city}</span>}
      </div>
 
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Provincia</label>
          <input
            className={`form-input ${errors.province ? "input-error" : ""}`}
            type="text"
            placeholder="Buenos Aires"
            value={form.province}
            onChange={e => onChange("province", e.target.value)}
          />
          {errors.province && <span className="field-error">{errors.province}</span>}
        </div>
        <div className="form-group form-group--narrow">
          <label className="form-label">Código postal</label>
          <input
            className={`form-input ${errors.postal ? "input-error" : ""}`}
            type="text"
            placeholder="C1043"
            value={form.postal}
            onChange={e => onChange("postal", formatPostal(e.target.value))}
            maxLength={8}
          />
          {errors.postal && <span className="field-error">{errors.postal}</span>}
        </div>
      </div>
    </div>
  );
}
 
// ─── Pickup info ──────────────────────────────────────────────────────────────
const STORE = {
  name:    "ÉLUME Fashion — Sucursal CABA",
  address: "Av. Santa Fe 1234, Buenos Aires, Argentina",
  hours:   "Lun – Sáb · 10:00 – 20:00",
  note:    "Te avisaremos cuando tu pedido esté listo (aprox. 24 h hábiles).",
};
 
function PickupInfo() {
  const mapsEmbedUrl =
    "https://www.google.com/maps/embed/v1/place" +
    "?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY" +
    "&q=" + encodeURIComponent(STORE.address) +
    "&zoom=16";
 
  const mapsDirectionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(STORE.address);
 
  return (
    <div className="pickup-wrap">
      <div className="pickup-info">
        <div className="pickup-icon">🏪</div>
        <div className="pickup-details">
          <p className="pickup-title">{STORE.name}</p>
          <p className="pickup-address">{STORE.address}</p>
          <p className="pickup-hours">{STORE.hours}</p>
          <p className="pickup-note">{STORE.note}</p>
          <a
            className="btn-directions"
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>📍</span> Cómo llegar
          </a>
        </div>
      </div>
      <div className="pickup-map">
        <iframe
          title="Ubicación de la tienda"
          src={mapsEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
 
// ─── Notification preferences ────────────────────────────────────────────────
function ContactNotification({ contact, onChange, errors }) {
  return (
    <div className="notif-section">
      <h3 className="delivery-section-title">Datos de contacto y notificaciones</h3>
 
      {/* Notification channel toggle */}
      <div className="notif-toggle">
        <label
          className={`notif-opt ${contact.channel === "email" ? "notif-active" : ""}`}
          onClick={() => onChange("channel", "email")}
        >
          <span className="notif-radio">
            {contact.channel === "email" && <span className="notif-radio-dot" />}
          </span>
          <span className="notif-icon">✉️</span>
          <span>Notificarme por email</span>
        </label>
 
        <label
          className={`notif-opt ${contact.channel === "phone" ? "notif-active" : ""}`}
          onClick={() => onChange("channel", "phone")}
        >
          <span className="notif-radio">
            {contact.channel === "phone" && <span className="notif-radio-dot" />}
          </span>
          <span className="notif-icon">📱</span>
          <span>Notificarme por teléfono</span>
        </label>
      </div>
 
      {/* Phone + DNI — only shown when channel === "phone" */}
      {contact.channel === "phone" && (
        <div className="notif-fields">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Teléfono</label>
              <input
                className={`form-input ${errors.phone ? "input-error" : ""}`}
                type="tel"
                placeholder="+54 9 11 1234 5678"
                value={contact.phone}
                onChange={e => onChange("phone", formatPhone(e.target.value))}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">DNI</label>
              <input
                className={`form-input ${errors.dni ? "input-error" : ""}`}
                type="text"
                placeholder="12345678"
                value={contact.dni}
                onChange={e => onChange("dni", formatDni(e.target.value))}
                maxLength={8}
              />
              {errors.dni && <span className="field-error">{errors.dni}</span>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
// ─── Order summary ────────────────────────────────────────────────────────────
function OrderSummary({ cart }) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  return (
    <div className="order-summary">
      <h3 className="summary-title">Resumen del pedido</h3>
      <ul className="summary-list">
        {cart.map(item => (
          <li key={item.id} className="summary-item">
            <img src={item.image1} alt={item.name} className="summary-thumb" />
            <div className="summary-item-info">
              <p className="summary-item-name">{item.name}</p>
              <p className="summary-item-qty">x{item.qty}</p>
            </div>
            <span className="summary-item-price">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="summary-total">
        <span>Total</span>
        <span className="total-price">${subtotal.toFixed(2)}</span>
      </div>
    </div>
  );
}
 
// ─── Checkout page ────────────────────────────────────────────────────────────
const EMPTY_FORM    = { street: "", number: "", city: "", province: "", postal: "" };
const EMPTY_CONTACT = { channel: "email", phone: "", dni: "" };
 
export default function CheckoutPage({ cart, setPage, onOrderComplete }) {
  const [delivery, setDelivery] = useState("envio"); // "envio" | "retiro"
  const [form,     setForm]     = useState(EMPTY_FORM);
  const [contact,  setContact]  = useState(EMPTY_CONTACT);
  const [errors,   setErrors]   = useState({});
  const [done,     setDone]     = useState(false);
 
  const updateField = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };
 
  const updateContact = (k, v) => {
    setContact(c => ({ ...c, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: "" }));
  };
 
  const validate = () => {
    const errs = {};
 
    // Address fields — only required when delivering
    if (delivery === "envio") {
      if (!form.street.trim())   errs.street   = "Ingresá la calle.";
      if (!form.number.trim())   errs.number   = "Ingresá el número.";
      if (!form.city.trim())     errs.city     = "Ingresá la ciudad.";
      if (!form.province.trim()) errs.province = "Ingresá la provincia.";
      if (!form.postal.trim() || form.postal.length < 4)
        errs.postal = "Código postal inválido.";
    }
 
    // Contact fields — only required when notifying by phone
    if (contact.channel === "phone") {
      if (!contact.phone.trim() || contact.phone.replace(/\D/g, "").length < 7)
        errs.phone = "Ingresá un número válido.";
      if (!contact.dni.trim() || contact.dni.length < 7)
        errs.dni = "Ingresá un DNI válido (7-8 dígitos).";
    }
 
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };
 
  const handleConfirm = () => {
    if (!validate()) return;
    setDone(true);
    if (onOrderComplete) onOrderComplete();
  };
 
  // ── Success screen ──────────────────────────────────────────────────────────
  if (done) {
    const notifMsg = contact.channel === "phone"
      ? `Te notificaremos al ${contact.phone}.`
      : "Te notificaremos por email.";
 
    return (
      <main className="auth-page">
        <div className="success-card" style={{ maxWidth: 440, width: "100%" }}>
          <span className="success-check">✓</span>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 300 }}>¡Pedido confirmado!</h2>
          <p style={{ color: "#888", fontSize: 14, textAlign: "center" }}>
            {delivery === "envio"
              ? `Te enviaremos tu pedido a ${form.street} ${form.number}, ${form.city}.`
              : "Podés pasar a retirarlo en nuestra tienda."}
          </p>
          <p style={{ color: "#aaa", fontSize: 13, textAlign: "center" }}>{notifMsg}</p>
          <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => setPage("home")}>
            Volver a la tienda
          </button>
        </div>
      </main>
    );
  }
 
  // ── Empty cart guard ────────────────────────────────────────────────────────
  if (cart.length === 0) {
    return (
      <main className="auth-page">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: 40, marginBottom: 12 }}>🛒</p>
          <h2 style={{ fontFamily: "var(--fd)", fontWeight: 300, marginBottom: 8 }}>
            Tu carrito está vacío
          </h2>
          <button className="btn-auth" onClick={() => setPage("home")}>
            Ir a la tienda
          </button>
        </div>
      </main>
    );
  }
 
  return (
    <main className="checkout-page">
      <div className="checkout-inner">
 
        {/* Left column */}
        <div className="checkout-left">
          <button className="btn-back" onClick={() => setPage("home")}>
            ← Seguir comprando
          </button>
          <h2 className="page-title" style={{ marginBottom: 28 }}>Finalizar compra</h2>
 
          {/* Delivery / Pickup toggle */}
          <div className="delivery-toggle">
            <button
              className={`toggle-opt ${delivery === "envio" ? "toggle-active" : ""}`}
              onClick={() => setDelivery("envio")}
            >
              <span className="toggle-icon">🚚</span>
              <span>Recibir en domicilio</span>
            </button>
            <button
              className={`toggle-opt ${delivery === "retiro" ? "toggle-active" : ""}`}
              onClick={() => setDelivery("retiro")}
            >
              <span className="toggle-icon">🏪</span>
              <span>Retirar en tienda</span>
            </button>
          </div>
 
          {/* Conditional delivery content */}
          <div className="delivery-body">
            {delivery === "envio" ? (
              <>
                <h3 className="delivery-section-title">Dirección de entrega</h3>
                <DeliveryForm form={form} onChange={updateField} errors={errors} />
              </>
            ) : (
              <PickupInfo />
            )}
          </div>
 
          {/* Notification preferences */}
          <ContactNotification contact={contact} onChange={updateContact} errors={errors} />
 
          <button className="btn-confirm" onClick={handleConfirm}>
            Confirmar pedido →
          </button>
        </div>
 
        {/* Right column — order summary */}
        <div className="checkout-right">
          <OrderSummary cart={cart} />
        </div>
 
      </div>
    </main>
  );
}