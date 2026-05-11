import { useI18n } from "../i18n/I18nContext.jsx";
import { Logo } from "./Logo.jsx";

export function Sidebar({ activeModuleId, navigation, onSelectModule }) {
  const { t } = useI18n();

  return (
    <aside className="sidebar">
      <div className="brand">
        <Logo size={52} variant="light" />
        <div>
          <strong>{t.platformName}</strong>
          <span>{t.sidebarSubtitle}</span>
        </div>
      </div>

      <nav className="nav" aria-label="Modulos de PCD">
        {navigation.map(({ id, name, Icon }) => (
          <button
            className={`nav-item ${activeModuleId === id ? "active" : ""}`}
            key={id}
            onClick={() => onSelectModule(id)}
            type="button"
          >
            <Icon size={18} />
            <span>{t.modules[id] ?? name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
