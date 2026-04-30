import { useState } from "react";
import { IconMsg } from "../components/icons";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (sent) return (
    <main className="content-page">
      <div className="success-card">
        <span className="success-check">✓</span>
        <h2>¡Mensaje enviado!</h2>
        <p>Te responderemos a la brevedad.</p>
      </div>
    </main>
  );

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <IconMsg size={32} />
          <h2 style={{ margin: "0.5rem 0 0" }}>Contáctenos</h2>
          <p className="auth-subtitle">Estamos para ayudarte</p>
        </div>
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input className="form-input" type="text" placeholder="Tu nombre" value={form.name} onChange={e => update("name", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="tu@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Mensaje</label>
          <textarea className="form-input form-textarea" placeholder="¿En qué podemos ayudarte?" value={form.msg} onChange={e => update("msg", e.target.value)} rows={5} />
        </div>
        <button className="btn-auth" onClick={() => { if (form.name && form.email && form.msg) setSent(true); }}>Enviar mensaje</button>
      </div>
    </main>
  );
}