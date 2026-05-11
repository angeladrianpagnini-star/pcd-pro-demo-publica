import { useState } from "react";
import { loginUser } from "../../shared/api/client.js";
import { useI18n } from "../../shared/i18n/I18nContext.jsx";
import { LanguageSelector } from "../../shared/ui/LanguageSelector.jsx";
import { Logo } from "../../shared/ui/Logo.jsx";

export function LoginView({ onLogin }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("admin@pcd.local");
  const [password, setPassword] = useState("pcd-demo-2026");
  const [status, setStatus] = useState({ type: "idle", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "loading", message: t.entering });

    try {
      const session = await loginUser({ email, password });
      onLogin(session);
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-mark">
          <Logo size={58} />
        </div>
        <LanguageSelector />
        <p className="eyebrow">{t.privateAccess}</p>
        <h1>{t.platformName}</h1>
        <p>{t.loginIntro}</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              autoComplete="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            <span>{t.password}</span>
            <input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className="button primary" disabled={status.type === "loading"} type="submit">
            {t.enter}
          </button>
          {status.message && <p className={`form-message ${status.type}`}>{status.message}</p>}
        </form>
      </section>
    </main>
  );
}
