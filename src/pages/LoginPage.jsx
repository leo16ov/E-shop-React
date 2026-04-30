import { useState } from "react";
import { GoogleIcon } from "../components/icons";

export default function LoginPage({ setPage, onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!email || !pass) { setError("Completá todos los campos."); return; }
    onLogin({ name: email.split("@")[0], email });
    setPage("home");
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <span className="logo-text" style={{ fontSize: "2rem" }}>ÉLUME</span>
          <p className="auth-subtitle">Accedé a tu cuenta</p>
        </div>
        {error && <p className="auth-error">{error}</p>}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input className="form-input" type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} />
        </div>
        <button className="btn-auth" onClick={handleSubmit}>Iniciar sesión</button>
        <div className="auth-divider"><span>o</span></div>
        <button className="btn-google" onClick={() => { onLogin({ name: "Usuario Google", email: "usuario@gmail.com" }); setPage("home"); }}>
          <GoogleIcon />
          Continuar con Google
        </button>
        <p className="auth-switch">¿No tenés cuenta? <button className="link-btn" onClick={() => setPage("register")}>Registrate</button></p>
      </div>
    </main>
  );
}