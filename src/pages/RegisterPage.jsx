import { useState } from "react";
import { GoogleIcon } from "../components/icons";

export default function RegisterPage({ setPage, onLogin }) {
  const [form, setForm] = useState({ user: "", name: "", surname: "", email: "", pass: "" });
  const [error, setError] = useState("");
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = () => {
    if (Object.values(form).some(v => !v)) { setError("Completá todos los campos."); return; }
    onLogin({ name: `${form.name} ${form.surname}`, email: form.email });
    setPage("home");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="logo-text" style={{ fontSize: "2rem" }}>ÉLUME</span>
          <p className="auth-subtitle">Creá tu cuenta</p>
        </div>
        {error && <p className="auth-error">{error}</p>}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <input className="form-input" type="text" placeholder="Ana" value={form.name} onChange={e => update("name", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Apellido</label>
            <input className="form-input" type="text" placeholder="García" value={form.surname} onChange={e => update("surname", e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Usuario</label>
          <input className="form-input" type="text" placeholder="ana.garcia" value={form.user} onChange={e => update("user", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="ana@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input className="form-input" type="password" placeholder="••••••••" value={form.pass} onChange={e => update("pass", e.target.value)} />
        </div>
        <button className="btn-auth" onClick={handleSubmit}>Crear cuenta</button>
        <div className="auth-divider"><span>o</span></div>
        <button className="btn-google" onClick={() => { onLogin({ name: "Usuario Google", email: "usuario@gmail.com" }); setPage("home"); }}>
          <GoogleIcon />
          Continuar con Google
        </button>
        <p className="auth-switch">¿Ya tenés cuenta? <button className="link-btn" onClick={() => setPage("login")}>Iniciá sesión</button></p>
      </div>
    </main>
  );
}