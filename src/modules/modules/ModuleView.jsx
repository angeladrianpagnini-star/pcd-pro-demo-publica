import { ArrowUpRight, Database, ListChecks } from "lucide-react";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";

export function ModuleView({ module }) {
  return (
    <div className="view-stack">
      <section className="module-hero">
        <div>
          <p className="eyebrow">{module.stage}</p>
          <h1>{module.name}</h1>
          <p>{module.description}</p>
        </div>
        <StatusPill tone={module.priority === "Alta" ? "success" : "info"}>
          Prioridad {module.priority}
        </StatusPill>
      </section>

      <section className="module-grid">
        <article className="panel span-7">
          <div className="section-title">
            <div>
              <p className="eyebrow">Flujos clave</p>
              <h2>Que debe poder hacer</h2>
            </div>
            <ListChecks size={22} />
          </div>
          <div className="check-list">
            {module.flows.map((flow) => (
              <div className="check-row" key={flow}>
                <span />
                <p>{flow}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel span-5">
          <div className="section-title">
            <div>
              <p className="eyebrow">Datos</p>
              <h2>Entidades necesarias</h2>
            </div>
            <Database size={22} />
          </div>
          <div className="entity-tags">
            {module.entities.map((entity) => (
              <span key={entity}>{entity}</span>
            ))}
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="section-title">
          <div>
            <p className="eyebrow">Entregable profesional</p>
            <h2>Resultado esperado del modulo</h2>
          </div>
          <ArrowUpRight size={22} />
        </div>
        <p className="large-text">{module.outcome}</p>
      </section>
    </div>
  );
}
