import { Logo } from "./Logo.jsx";

export function Sidebar({ activeModuleId, navigation, onSelectModule }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <Logo size={52} variant="light" />
        <div>
          <strong>PCD Pro</strong>
          <span>Web + API + App mobile</span>
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
            <span>{name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
