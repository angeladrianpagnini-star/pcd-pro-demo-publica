import { IS_DEMO_MODE } from "../api/client.js";
import { useI18n } from "../i18n/I18nContext.jsx";
import { LanguageSelector } from "./LanguageSelector.jsx";

export function Topbar({ activeModule, session, onLogout }) {
  const { t } = useI18n();

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{t.platformSubtitle}</p>
        <h2>{t.modules[activeModule.id] ?? activeModule.name}</h2>
      </div>
      <div className="topbar-actions">
        <LanguageSelector compact />
        {session?.user && <span className="user-chip">{session.user.email}</span>}
        <button className="button secondary" type="button">
          {IS_DEMO_MODE ? t.publicDemo : t.export}
        </button>
        <button className="button primary" onClick={onLogout} type="button">
          {t.logout}
        </button>
      </div>
    </header>
  );
}
