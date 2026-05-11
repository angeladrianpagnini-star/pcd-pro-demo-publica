import { IS_DEMO_MODE } from "../api/client.js";

export function Topbar({ activeModule, session, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Plataforma de Competencias Digitales</p>
        <h2>{activeModule.name}</h2>
      </div>
      <div className="topbar-actions">
        {session?.user && <span className="user-chip">{session.user.email}</span>}
        <button className="button secondary" type="button">
          {IS_DEMO_MODE ? "Demo publica" : "Exportar"}
        </button>
        <button className="button primary" onClick={onLogout} type="button">
          Salir
        </button>
      </div>
    </header>
  );
}
