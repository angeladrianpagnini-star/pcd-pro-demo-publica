import { BookOpen, Dumbbell, ExternalLink, FileVideo, MonitorPlay, Target, Trophy } from "lucide-react";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";

const dtDigitalUrl =
  "https://angeladrianpagnini-star.github.io/DT_Digital_Profesional/DT_Digital_Profesional/prototipo_web/index.html";

const staffTools = [
  ["Planificacion", "microciclos, objetivos, cargas y sesiones"],
  ["DT Digital Profesional", "herramienta tactica, estilo de juego y experiencia guiada"],
  ["Evidencia audiovisual", "videos, clips tecnicos, devoluciones y seguimiento"],
  ["Capacitacion", "biblioteca para DT, PF y staff autorizado"]
];

const dtFlows = [
  "Seleccionar estilo de juego y modelo de decision.",
  "Explorar propuesta tactica desde el prototipo DT Digital.",
  "Vincular sesiones con jugadores, equipos y objetivos PCD Pro.",
  "Guardar evidencia futura con FederalTrust e I.D.A. Elite."
];

export function StaffView() {
  return (
    <div className="view-stack staff-view">
      <section className="staff-hero">
        <div>
          <p className="eyebrow">Desarrollo deportivo</p>
          <h1>DT/PF y capacitacion</h1>
          <p>
            Centro de herramientas para cuerpos tecnicos: planificacion, evaluaciones,
            capacitacion, evidencia audiovisual y acceso integrado a DT Digital Profesional.
          </p>
        </div>
        <div className="staff-tool-card">
          <MonitorPlay size={28} />
          <strong>DT Digital Profesional</strong>
          <span>Herramienta tactica integrada</span>
          <a className="button primary" href={dtDigitalUrl} rel="noreferrer" target="_blank">
            Abrir herramienta
          </a>
        </div>
      </section>

      <section className="module-grid">
        <article className="panel span-5 staff-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Herramientas del modulo</p>
              <h2>Suite DT/PF</h2>
            </div>
            <Dumbbell size={22} />
          </div>
          <div className="staff-tool-list">
            {staffTools.map(([title, detail]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel span-7 staff-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">DT Digital Profesional</p>
              <h2>Vista embebida</h2>
            </div>
            <ExternalLink size={22} />
          </div>
          <div className="staff-embed">
            <iframe
              src={dtDigitalUrl}
              title="DT Digital Profesional"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </article>
      </section>

      <section className="module-grid">
        <article className="panel span-7 staff-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Flujo de trabajo</p>
              <h2>Como encaja en PCD Pro</h2>
            </div>
            <Target size={22} />
          </div>
          <div className="staff-flow">
            {dtFlows.map((flow, index) => (
              <div key={flow}>
                <span>{index + 1}</span>
                <p>{flow}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel span-5 staff-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Preparado para escalar</p>
              <h2>Proximas conexiones</h2>
            </div>
            <BookOpen size={22} />
          </div>
          <div className="staff-next">
            <article>
              <FileVideo size={18} />
              <strong>Sesiones con evidencia</strong>
              <span>clips, ejercicios y devoluciones</span>
            </article>
            <article>
              <Trophy size={18} />
              <strong>Objetivos por equipo</strong>
              <span>modelo de juego y rendimiento</span>
            </article>
          </div>
          <StatusPill tone="info">integracion externa activa</StatusPill>
        </article>
      </section>
    </div>
  );
}
