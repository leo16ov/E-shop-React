import { useState } from "react";
import { register, googleLoginUrl } from "../lib/api";

export default function RegisterPage({ setPage, onLogin }) {
  const [form,    setForm]    = useState({ name: "", surname: "", email: "", pass: "" });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name || !form.email || !form.pass) {
      setError("Completá nombre, email y contraseña.");
      return;
    }
    setLoading(true);
    try {
      // El DNI y el teléfono no se piden acá: quedan NULL en la DB.
      const user = await register({
        nombre:   form.name,
        apellido: form.surname,
        email:    form.email,
        password: form.pass,
      });
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
        <h1 className="auth-title">Crear cuenta</h1>

        {error && <p className="auth-error">{error}</p>}

        <label>Nombre</label>
        <input value={form.name} onChange={set("name")} />

        <label>Apellido</label>
        <input value={form.surname} onChange={set("surname")} />

        <label>Email</label>
        <input type="email" value={form.email} onChange={set("email")} />

        <label>Contraseña</label>
        <input type="password" value={form.pass} onChange={set("pass")} />

        <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Creando…" : "Registrarme"}
        </button>

        <button className="btn btn-google" onClick={() => (window.location.href = googleLoginUrl())}>
          Continuar con Google
        </button>

        <p className="auth-switch">
          ¿Ya tenés cuenta?{" "}
          <button className="link" onClick={() => setPage("login")}>Iniciá sesión</button>
        </p>
      </div>
    </main>
  );
}
