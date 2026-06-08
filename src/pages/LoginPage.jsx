import { useState } from "react";
import { login, googleLoginUrl } from "../lib/api";

export default function LoginPage({ setPage, onLogin }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) {
      setError("Completá email y contraseña.");
      return;
    }
    setLoading(true);
    try {
      const user = await login({ email, password });
      onLogin({ name: user.nombre, email: user.email, rol: user.rol });
      setPage("home");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar sesión</h1>

        {error && <p className="auth-error">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />

        <label>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />

        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Ingresando…" : "Ingresar"}
        </button>

        <button className="btn btn-google" onClick={() => (window.location.href = googleLoginUrl())}>
          Continuar con Google
        </button>

        <p className="auth-switch">
          ¿No tenés cuenta?{" "}
          <button className="link" onClick={() => setPage("register")}>Registrate</button>
        </p>
      </div>
    </main>
  );
}
