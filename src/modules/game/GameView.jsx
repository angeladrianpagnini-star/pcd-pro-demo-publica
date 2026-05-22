import { Gamepad2, MonitorPlay, Play, Radio, Sparkles, Trophy, UsersRound } from "lucide-react";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";

const dtDigitalUrl =
  "https://angeladrianpagnini-star.github.io/DT_Digital_Profesional/DT_Digital_Profesional/prototipo_web/index.html";

const gamerModes = [
  ["DT Digital Profesional", "experiencia tactica gamer para seleccionar estilo y tomar decisiones"],
  ["Desafios tecnicos", "retos individuales, rankings y objetivos por categoria"],
  ["Comunidad y sponsors", "misiones, recompensas y activaciones presenciales"],
  ["Streaming y clips", "highlights, jugadas y evidencia audiovisual del juego"]
];

const gameLoop = [
  "Entrar al espacio gamer Juego DT.",
  "Abrir DT Digital Profesional y elegir estilo de juego.",
  "Convertir decisiones tacticas en desafios, rankings o misiones.",
  "Conectar resultados con PCD Pro, I.D.A. Elite y FederalTrust si corresponde."
];

export function GameView() {
  return (
    <div className="view-stack game-view">
      <section className="game-hero">
        <div>
          <p className="eyebrow">Engagement & Gamification Layer</p>
          <h1>Juego DT</h1>
          <p>
            Espacio gamer de PCD Pro para desafios, simulacion tactica, rankings,
            comunidad, sponsors y experiencias competitivas. DT Digital Profesional vive aca como
            herramienta tactica interactiva.
          </p>
        </div>
        <div className="game-launch-card">
          <Gamepad2 size={30} />
          <strong>DT Digital Profesional</strong>
          <span>Simulacion tactica + experiencia gamer</span>
          <a className="button primary" href={dtDigitalUrl} rel="noreferrer" target="_blank">
            Abrir herramienta
          </a>
        </div>
      </section>

      <section className="module-grid">
        <article className="panel span-4 game-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Modos gamer</p>
              <h2>Experiencias</h2>
            </div>
            <Sparkles size={22} />
          </div>
          <div className="game-mode-list">
            {gamerModes.map(([title, detail]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="panel span-8 game-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Herramienta embebida</p>
              <h2>DT Digital Profesional</h2>
            </div>
            <MonitorPlay size={22} />
          </div>
          <div className="game-embed">
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
        <article className="panel span-7 game-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Loop de producto</p>
              <h2>De juego a valor deportivo</h2>
            </div>
            <Play size={22} />
          </div>
          <div className="game-flow">
            {gameLoop.map((flow, index) => (
              <div key={flow}>
                <span>{index + 1}</span>
                <p>{flow}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel span-5 game-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Monetizacion y comunidad</p>
              <h2>Preparado para escalar</h2>
            </div>
            <Trophy size={22} />
          </div>
          <div className="game-next">
            <article>
              <UsersRound size={18} />
              <strong>Comunidad</strong>
              <span>usuarios, equipos, ligas y sponsors</span>
            </article>
            <article>
              <Radio size={18} />
              <strong>Eventos y streaming</strong>
              <span>clips, rankings y activaciones</span>
            </article>
          </div>
          <StatusPill tone="info">espacio gamer activo</StatusPill>
        </article>
      </section>
    </div>
  );
}
