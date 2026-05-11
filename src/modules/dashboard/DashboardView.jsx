import { CheckCircle2, CircleAlert, CircleDollarSign, Layers3 } from "lucide-react";
import { AdminCreatePanel } from "./components/AdminCreatePanel.jsx";
import { AuditPanel } from "./components/AuditPanel.jsx";
import { RecordsPanel } from "./components/RecordsPanel.jsx";
import { MetricCard } from "../../shared/ui/MetricCard.jsx";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";
import { useI18n } from "../../shared/i18n/I18nContext.jsx";

export function DashboardView({ apiState, metrics, roleMatrix, modules, onRefreshApi, token }) {
  const { t } = useI18n();
  const text = t.dashboard;
  const apiSummary = apiState.data?.summary;

  return (
    <div className="view-stack">
      <section className="hero-panel">
        <div>
          <p className="eyebrow">{text.heroEyebrow}</p>
          <h1>{text.heroTitle}</h1>
          <p>{text.heroCopy}</p>
        </div>
        <div className="hero-actions" aria-label="Acciones principales">
          <button className="button primary">{text.createTournament}</button>
          <button className="button secondary">{text.auditMatchday}</button>
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
            <p className="eyebrow">{text.backendEyebrow}</p>
            <h2>{text.backendTitle}</h2>
          </div>
          <StatusPill tone={apiState.status === "connected" ? "success" : "warning"}>
            {apiState.status === "connected" ? text.connected : text.waitingApi}
          </StatusPill>
        </div>
        {apiState.status === "connected" ? (
          <div className="api-grid">
            <ApiItem label={text.users} value={apiSummary.users} />
            <ApiItem label={text.roles} value={apiSummary.roles} />
            <ApiItem label={text.leagues} value={apiSummary.leagues} />
            <ApiItem label={text.clubs} value={apiSummary.clubs} />
            <ApiItem label={text.tournaments} value={apiSummary.tournaments} />
            <ApiItem label={text.players} value={apiSummary.players} />
            <ApiItem label={text.matches} value={apiSummary.matches} />
            <ApiItem label={text.discipline} value={apiSummary.disciplinaryCases} />
            <ApiItem label={text.game} value={apiSummary.gameChallenges} />
            <ApiItem label={text.audit} value={apiSummary.auditLogs} />
          </div>
        ) : (
          <p className="api-message">
            {text.backendHelp} <code>npm.cmd run api</code> {text.backendHelpEnd}
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
              <p className="eyebrow">{text.productPriority}</p>
              <h2>{text.firstCore}</h2>
            </div>
            <StatusPill tone="success">MVP</StatusPill>
          </div>
          <div className="timeline">
            <Step icon={Layers3} title={text.territorialModel} text={text.territorialModelText} />
            <Step icon={CheckCircle2} title={text.officialMatch} text={text.officialMatchText} />
            <Step icon={CircleAlert} title={text.integrity} text={text.integrityText} />
            <Step icon={CircleDollarSign} title={text.commercialValue} text={text.commercialValueText} />
          </div>
        </article>

        <article className="panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">{text.permissions}</p>
              <h2>{text.roleMatrix}</h2>
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
            <p className="eyebrow">{text.functionalMap}</p>
            <h2>{text.proModules}</h2>
          </div>
          <StatusPill tone="info">
            {modules.length} {text.modulesCount}
          </StatusPill>
        </div>
        <div className="module-map">
          {modules.slice(1).map((module) => (
            <article key={module.id}>
              <strong>{t.modules[module.id] ?? module.name}</strong>
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
