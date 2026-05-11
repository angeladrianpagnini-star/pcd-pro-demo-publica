import { StatusPill } from "../../../shared/ui/StatusPill.jsx";

export function AuditPanel({ logs = [] }) {
  const visibleLogs = logs.slice(0, 8);

  return (
    <section className="panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">Auditoria</p>
          <h2>Actividad reciente</h2>
        </div>
        <StatusPill tone="info">{logs.length} eventos</StatusPill>
      </div>

      {visibleLogs.length === 0 ? (
        <p className="api-message">Todavia no hay actividad registrada.</p>
      ) : (
        <div className="audit-list">
          {visibleLogs.map((log) => (
            <article className="audit-row" key={log.id}>
              <div>
                <strong>{log.action}</strong>
                <p>{log.detail}</p>
              </div>
              <div className="audit-meta">
                <span>{log.actor}</span>
                <time>{formatDate(log.createdAt)}</time>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function formatDate(value) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
