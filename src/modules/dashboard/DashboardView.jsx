import { CheckCircle2, CircleAlert, CircleDollarSign, Layers3 } from "lucide-react";
import { AdminCreatePanel } from "./components/AdminCreatePanel.jsx";
import { AuditPanel } from "./components/AuditPanel.jsx";
import { RecordsPanel } from "./components/RecordsPanel.jsx";
import { MetricCard } from "../../shared/ui/MetricCard.jsx";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";

export function DashboardView({ apiState, metrics, roleMatrix, modules, onRefreshApi, token }) {
  const apiSummary = apiState.data?.summary;

  return (
    <div className="view-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Operacion integral</p>
          <h1>PCD Pro centraliza competencia, identidad, evidencia y sustentabilidad.</h1>
          <p>
            Base preparada para convertir el informe funcional en una plataforma real para
            ligas, clubes, arbitros, cuerpos tecnicos, profesionales, sponsors y jugadores.
          </p>
        </div>
        <div className="hero-actions" aria-label="Acciones principales">
          <button className="button primary">Crear torneo</button>
          <button className="button secondary">Auditar jornada</button>
        </div>
      </section>

      <section className="metric-grid" aria-label="Indicadores generales">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </section>

      <section className="panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Backend local</p>
            <h2>API inicial de PCD Pro</h2>
          </div>
          <StatusPill tone={apiState.status === "connected" ? "success" : "warning"}>
            {apiState.status === "connected" ? "Conectada" : "Esperando API"}
          </StatusPill>
        </div>
        {apiState.status === "connected" ? (
          <div className="api-grid">
            <ApiItem label="Usuarios" value={apiSummary.users} />
            <ApiItem label="Roles" value={apiSummary.roles} />
            <ApiItem label="Ligas" value={apiSummary.leagues} />
            <ApiItem label="Clubes" value={apiSummary.clubs} />
            <ApiItem label="Torneos" value={apiSummary.tournaments} />
            <ApiItem label="Jugadores" value={apiSummary.players} />
            <ApiItem label="Partidos" value={apiSummary.matches} />
            <ApiItem label="Disciplina" value={apiSummary.disciplinaryCases} />
            <ApiItem label="Juego DT" value={apiSummary.gameChallenges} />
            <ApiItem label="Auditoria" value={apiSummary.auditLogs} />
          </div>
        ) : (
          <p className="api-message">
            Inicia el backend con <code>npm.cmd run api</code> para ver datos servidos desde
            <code> http://127.0.0.1:4000/api</code>.
          </p>
        )}
      </section>

      <AdminCreatePanel
        apiState={apiState}
        clubs={apiState.data?.clubs ?? []}
        leagues={apiState.data?.leagues ?? []}
        tournaments={apiState.data?.tournaments ?? []}
        onCreated={onRefreshApi}
        token={token}
      />

      <RecordsPanel apiState={apiState} data={apiState.data} />

      <AuditPanel logs={apiState.data?.auditLogs ?? []} />

      <section className="two-column">
        <article className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Prioridad de producto</p>
              <h2>Nucleo que debe construirse primero</h2>
            </div>
            <StatusPill tone="success">MVP</StatusPill>
          </div>
          <div className="timeline">
            <Step icon={Layers3} title="Modelo territorial" text="Ligas, clubes, categorias, torneos y sedes." />
            <Step icon={CheckCircle2} title="Partido oficial" text="Fixture, arbitro, eventos, cierre y tablas automaticas." />
            <Step icon={CircleAlert} title="Integridad" text="Disciplina, evidencias, resoluciones y auditoria." />
            <Step icon={CircleDollarSign} title="Valor comercial" text="Scouting, pagos, streaming y sponsors con metricas." />
          </div>
        </article>

        <article className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Permisos</p>
              <h2>Matriz inicial de roles</h2>
            </div>
            <StatusPill>RBAC</StatusPill>
          </div>
          <div className="role-list">
            {roleMatrix.map((role) => (
              <div className="role-row" key={role.role}>
                <strong>{role.role}</strong>
                <span>{role.scope}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Mapa funcional</p>
            <h2>Modulos de la version pro</h2>
          </div>
          <StatusPill tone="info">{modules.length} modulos</StatusPill>
        </div>
        <div className="module-map">
          {modules.slice(1).map((module) => (
            <article key={module.id}>
              <strong>{module.name}</strong>
              <span>{module.outcome}</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function ApiItem({ label, value }) {
  return (
    <div className="api-item">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Step({ icon: Icon, title, text }) {
  return (
    <div className="timeline-step">
      <span className="timeline-icon">
        <Icon size={18} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}
