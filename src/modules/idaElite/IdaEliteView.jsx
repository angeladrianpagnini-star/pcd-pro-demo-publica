import { useMemo, useState } from "react";
import {
  Activity,
  BadgeCheck,
  Brain,
  ClipboardList,
  Cross,
  Database,
  Eye,
  FileText,
  Gauge,
  HeartPulse,
  KeyRound,
  LineChart,
  Lock,
  Radar,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UsersRound,
  Waves
} from "lucide-react";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";

const tabs = [
  { id: "access", label: "Acceso y carga", Icon: KeyRound },
  { id: "command", label: "Dashboard", Icon: Gauge },
  { id: "biometrics", label: "Biometria", Icon: Activity },
  { id: "profile", label: "Perfil 360", Icon: UsersRound },
  { id: "scouting", label: "Scouting IA", Icon: Radar },
  { id: "analytics", label: "Analytics", Icon: LineChart },
  { id: "medicine", label: "Medicina", Icon: Cross },
  { id: "psychology", label: "Psicologia", Icon: Brain },
  { id: "wellbeing", label: "Bienestar", Icon: Waves },
  { id: "academy", label: "Formacion", Icon: Trophy },
  { id: "ai", label: "AI Insights", Icon: Sparkles },
  { id: "youth", label: "Infanto juvenil", Icon: ShieldCheck },
  { id: "trust", label: "FederalTrust", Icon: BadgeCheck }
];

const kpis = [
  { label: "Riesgo de lesion", value: 18, suffix: "%", tone: "success", trend: "-6%" },
  { label: "Evolucion fisica", value: 84, suffix: "/100", tone: "info", trend: "+12%" },
  { label: "Carga deportiva", value: 71, suffix: "/100", tone: "warning", trend: "alta" },
  { label: "Recuperacion", value: 88, suffix: "%", tone: "success", trend: "+9%" },
  { label: "Indice emocional", value: 76, suffix: "/100", tone: "info", trend: "estable" },
  { label: "Potencial proyectado", value: 91, suffix: "/100", tone: "success", trend: "+4%" }
];

const athletes = [
  {
    id: "mateo",
    name: "Mateo Alvarez",
    age: 16,
    club: "Club Norte",
    role: "Extremo derecho",
    index: 89,
    projection: 94,
    risk: "Bajo",
    trend: "Ascendente",
    segment: "13-17",
    access: "Activo I.D.A. Elite",
    source: "Club + PF + medico",
    profileValue: 87,
    ecosystemSignals: 14
  },
  {
    id: "lucia",
    name: "Lucia Ferreyra",
    age: 15,
    club: "Liga Sur",
    role: "Mediocampista",
    index: 92,
    projection: 96,
    risk: "Controlado",
    trend: "Elite regional",
    segment: "13-17",
    access: "Activo I.D.A. Elite",
    source: "Liga + scouting + club",
    profileValue: 91,
    ecosystemSignals: 18
  },
  {
    id: "tomas",
    name: "Tomas Benitez",
    age: 11,
    club: "Escuela Federal",
    role: "Formativo",
    index: 78,
    projection: 86,
    risk: "Pedagogico",
    trend: "Desarrollo saludable",
    segment: "5-12",
    access: "Base interna protegida",
    source: "Escuela + tutor + torneo",
    profileValue: 72,
    ecosystemSignals: 9
  },
  {
    id: "valentina",
    name: "Valentina Rios",
    age: 17,
    club: "Sin alta en capa",
    role: "Arquera",
    index: 81,
    projection: 89,
    risk: "Pendiente",
    trend: "Prospecto a validar",
    segment: "13-17",
    access: "Prospecto consultable",
    source: "Partidos + scouting + disciplina",
    profileValue: 64,
    ecosystemSignals: 7
  }
];

const ecosystemInputs = [
  ["PCD Pro Core", "fichas, partidos, clubes, arbitraje y disciplina", 82],
  ["FederalTrust", "consentimientos, hashes, firmas, QR y cadena de custodia", 94],
  ["Scouting", "observaciones, rankings, comparativas y alertas de talento", 78],
  ["Salud y soporte", "aptos, lesiones, restricciones y seguimiento medico", 86],
  ["Juego DT", "engagement, habitos, participacion y objetivos cumplidos", 69]
];

const loaderRoles = [
  "club",
  "director tecnico",
  "preparador fisico",
  "medico",
  "scout",
  "psicologo",
  "familia/tutor",
  "auditor",
  "administrador"
];

const auditTrail = [
  ["PF Martin Costa", "carga biometrica", "validado por club", "Hash FT-8A92"],
  ["Dra. Paula Marino", "restriccion medica", "requiere firma medica", "Hash FT-4421"],
  ["Scout Regional", "observacion de potencial", "pendiente federacion", "Hash FT-19BF"]
];

const contentTypes = [
  "Plan de mejora",
  "Seguimiento semanal",
  "Evaluacion tecnica",
  "Reporte medico",
  "Informe psicologico",
  "Plan PF",
  "Reporte scouting",
  "Consentimiento / evidencia"
];

const initialWorkItems = [
  {
    title: "Plan de potencia y recuperacion",
    type: "Plan PF",
    owner: "PF Martin Costa",
    status: "en progreso",
    nextStep: "validar carga semanal y descanso"
  },
  {
    title: "Reporte de proyeccion regional",
    type: "Reporte scouting",
    owner: "Scout Regional",
    status: "pendiente FederalTrust",
    nextStep: "firma institucional y QR verificable"
  },
  {
    title: "Seguimiento emocional competitivo",
    type: "Informe psicologico",
    owner: "Psicologia deportiva",
    status: "privado",
    nextStep: "actualizar observacion profesional"
  }
];

const profileAreas = [
  ["Tecnica", 86, "control, pase, definicion, vision y posicionamiento"],
  ["Fisica", 82, "velocidad, fuerza, resistencia y explosion"],
  ["Tactica", 79, "lectura del juego, decisiones e inteligencia tactica"],
  ["Psicologica", 74, "resiliencia, presion, motivacion y liderazgo"],
  ["Social", 91, "integracion, conducta y convivencia"],
  ["Medica", 88, "historial, lesiones y restricciones"],
  ["Educativa", 83, "evolucion academica y disciplina formativa"],
  ["Nutricional", 77, "alimentacion, hidratacion y habitos"],
  ["Conductual", 90, "compromiso, responsabilidad y cumplimiento"]
];

const performanceSeries = [
  { label: "Rendimiento partido", value: 87 },
  { label: "Consistencia temporada", value: 81 },
  { label: "Curva crecimiento", value: 89 },
  { label: "Benchmark liga", value: 76 },
  { label: "Benchmark interno", value: 84 },
  { label: "Retroceso detectado", value: 12, inverse: true }
];

const medicalProtocols = [
  ["Isquiotibial derecho", "Reincidencia baja", "Retorno progresivo 9 dias"],
  ["Sobrecarga lumbar", "Alerta preventiva", "Reducir volumen 18%"],
  ["Apto medico", "Vigente", "FederalTrust evidence ready"]
];

const rolePermissions = [
  ["Liga / Federacion", "vision institucional, rankings y auditoria"],
  ["Club", "plantel, carga, alertas y evolucion"],
  ["DT / PF", "rendimiento, entrenamiento y objetivos"],
  ["Medico", "historial medico, restricciones y retorno"],
  ["Psicologo", "panel privado y evolucion emocional"],
  ["Scout", "proyeccion, comparativas y perfiles autorizados"],
  ["Familia / Tutor", "vista protegida infanto juvenil"],
  ["Auditor", "evidencia FederalTrust y trazabilidad"]
];

const initialBiometrics = [
  { metric: "Altura", value: "1.76 m", delta: "+2 cm", score: 78 },
  { metric: "Peso", value: "67.4 kg", delta: "+1.1 kg", score: 82 },
  { metric: "Masa muscular", value: "42%", delta: "+3%", score: 86 },
  { metric: "Hidratacion", value: "91%", delta: "optima", score: 91 },
  { metric: "Oxigenacion", value: "97%", delta: "estable", score: 88 },
  { metric: "Fatiga", value: "22%", delta: "-8%", score: 78 },
  { metric: "Velocidad", value: "31.8 km/h", delta: "+1.4", score: 84 },
  { metric: "Aceleracion", value: "8.7 m/s2", delta: "+0.5", score: 81 }
];

const insights = [
  "El patron de carga indica ventana optima para trabajo de potencia en 48 horas.",
  "El indice emocional se mantiene estable, pero baja bajo presion competitiva alta.",
  "La proyeccion deportiva mejora si se sostiene el plan de movilidad y recuperacion.",
  "No adultizar metricas del segmento 5-12: priorizar juego, bienestar y coordinacion."
];

function ScoreRing({ value, label }) {
  return (
    <div className="ida-ring" style={{ "--score": `${value * 3.6}deg` }}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function BarRow({ label, value, inverse = false }) {
  return (
    <div className="ida-bar-row">
      <div>
        <strong>{label}</strong>
        <span>{inverse ? "control de alerta" : "score activo"}</span>
      </div>
      <div className="ida-bar-track">
        <span style={{ width: `${value}%` }} />
      </div>
      <b>{value}</b>
    </div>
  );
}

export function IdaEliteView() {
  const [activeTab, setActiveTab] = useState("access");
  const [selectedAthleteId, setSelectedAthleteId] = useState(athletes[0].id);
  const selectedAthlete = athletes.find((athlete) => athlete.id === selectedAthleteId) ?? athletes[0];
  const [records, setRecords] = useState(initialBiometrics);
  const [biometricForm, setBiometricForm] = useState({
    metric: "Recuperacion",
    value: "86%",
    delta: "+5%",
    score: 86,
    loadedBy: "PF Martin Costa",
    role: "preparador fisico",
    validation: "pendiente FederalTrust"
  });
  const [workItems, setWorkItems] = useState(initialWorkItems);
  const [workForm, setWorkForm] = useState({
    title: "Plan individual de evolucion",
    type: "Plan de mejora",
    owner: "Director tecnico",
    status: "borrador",
    nextStep: "definir objetivos y metricas"
  });

  const biometricScore = useMemo(
    () => Math.round(records.reduce((sum, item) => sum + Number(item.score), 0) / records.length),
    [records]
  );

  function saveBiometric(event) {
    event.preventDefault();
    setRecords((current) => [
      {
        ...biometricForm,
        athlete: selectedAthlete.name,
        validatedBy: biometricForm.role,
        score: Math.max(0, Math.min(100, Number(biometricForm.score) || 0))
      },
      ...current.slice(0, 9)
    ]);
  }

  function saveWorkItem(event) {
    event.preventDefault();
    setWorkItems((current) => [
      {
        ...workForm,
        athlete: selectedAthlete.name
      },
      ...current.slice(0, 5)
    ]);
  }

  return (
    <div className="view-stack ida-view">
      <section className="ida-hero">
        <div>
          <p className="eyebrow">Capa premium de inteligencia deportiva avanzada</p>
          <h1>I.D.A. Elite</h1>
          <p className="ida-claim">Sport Intelligence System</p>
          <p>
            Suite enterprise integrada a PCD Pro para ciencia deportiva, biometria, medicina,
            psicologia, scouting inteligente, AI Insights, proteccion infanto juvenil y evidencia
            compatible con FederalTrust.
          </p>
          <div className="ida-hero-status">
            <StatusPill tone="success">Acceso por permisos</StatusPill>
            <StatusPill tone="info">Valor de perfil aun sin alta completa</StatusPill>
            <StatusPill tone="warning">Cargas trazables por responsable</StatusPill>
          </div>
        </div>
        <div className="ida-hero-metrics">
          <ScoreRing value={selectedAthlete.projection} label="potencial" />
          <ScoreRing value={selectedAthlete.profileValue} label="valor perfil" />
        </div>
      </section>

      <nav className="ida-tabs" aria-label="Navegacion I.D.A. Elite">
        {tabs.map(({ id, label, Icon }) => (
          <button
            className={activeTab === id ? "active" : ""}
            key={id}
            onClick={() => setActiveTab(id)}
            type="button"
          >
            <Icon size={17} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {activeTab === "access" && (
        <>
          <section className="module-grid">
            <article className="panel span-7 ida-panel">
            <div className="section-title">
              <div>
                <p className="eyebrow">Acceso controlado</p>
                <h2>Jugador, permisos y valor disponible</h2>
              </div>
              <KeyRound size={22} />
            </div>
            <div className="ida-access-layout">
              <label>
                Jugador consultado
                <select value={selectedAthleteId} onChange={(event) => setSelectedAthleteId(event.target.value)}>
                  {athletes.map((athlete) => (
                    <option key={athlete.id} value={athlete.id}>
                      {athlete.name} - {athlete.access}
                    </option>
                  ))}
                </select>
              </label>
              <div className="ida-access-card">
                <div>
                  <strong>{selectedAthlete.name}</strong>
                  <span>{selectedAthlete.role} - {selectedAthlete.age} anos - {selectedAthlete.segment}</span>
                </div>
                <StatusPill tone={selectedAthlete.access.includes("Activo") ? "success" : "warning"}>
                  {selectedAthlete.access}
                </StatusPill>
                <p>
                  Valor actual del perfil: <b>{selectedAthlete.profileValue}/100</b>. Se calcula con
                  {` ${selectedAthlete.ecosystemSignals} senales`} ya disponibles en el ecosistema,
                  aunque el jugador o club todavia no haya activado la capa premium.
                </p>
              </div>
            </div>
            <div className="ida-source-grid">
              {ecosystemInputs.map(([source, detail, score]) => (
                <article key={source}>
                  <Database size={18} />
                  <strong>{source}</strong>
                  <p>{detail}</p>
                  <div className="ida-bar-track">
                    <span style={{ width: `${score}%` }} />
                  </div>
                </article>
              ))}
            </div>
            </article>
            <article className="panel span-5 ida-panel">
            <div className="section-title">
              <div>
                <p className="eyebrow">Registro de accion</p>
                <h2>Quien carga y quien valida</h2>
              </div>
              <ClipboardList size={22} />
            </div>
            <form className="ida-form">
              <label>
                Responsable
                <input
                  value={biometricForm.loadedBy}
                  onChange={(event) => setBiometricForm({ ...biometricForm, loadedBy: event.target.value })}
                />
              </label>
              <label>
                Rol habilitado
                <select
                  value={biometricForm.role}
                  onChange={(event) => setBiometricForm({ ...biometricForm, role: event.target.value })}
                >
                  {loaderRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Validacion requerida
                <select
                  value={biometricForm.validation}
                  onChange={(event) => setBiometricForm({ ...biometricForm, validation: event.target.value })}
                >
                  <option>pendiente FederalTrust</option>
                  <option>validado por club</option>
                  <option>requiere firma medica</option>
                  <option>requiere tutor</option>
                  <option>solo auditoria interna</option>
                </select>
              </label>
            </form>
            <div className="ida-audit-list">
              {auditTrail.map(([person, action, status, hash]) => (
                <article key={`${person}-${hash}`}>
                  <strong>{person}</strong>
                  <span>{action}</span>
                  <StatusPill tone={status.includes("validado") ? "success" : "warning"}>{status}</StatusPill>
                  <small>{hash}</small>
                </article>
              ))}
            </div>
            </article>
          </section>

          <section className="module-grid">
            <article className="panel span-5 ida-panel">
              <div className="section-title">
                <div>
                  <p className="eyebrow">Crear contenido operativo</p>
                  <h2>Planes, reportes y seguimientos</h2>
                </div>
                <ClipboardList size={22} />
              </div>
              <form className="ida-form" onSubmit={saveWorkItem}>
                <label>
                  Titulo
                  <input
                    value={workForm.title}
                    onChange={(event) => setWorkForm({ ...workForm, title: event.target.value })}
                  />
                </label>
                <label>
                  Funcion
                  <select
                    value={workForm.type}
                    onChange={(event) => setWorkForm({ ...workForm, type: event.target.value })}
                  >
                    {contentTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Responsable
                  <input
                    value={workForm.owner}
                    onChange={(event) => setWorkForm({ ...workForm, owner: event.target.value })}
                  />
                </label>
                <label>
                  Estado del proceso
                  <select
                    value={workForm.status}
                    onChange={(event) => setWorkForm({ ...workForm, status: event.target.value })}
                  >
                    <option>borrador</option>
                    <option>en progreso</option>
                    <option>pendiente FederalTrust</option>
                    <option>privado</option>
                    <option>validado</option>
                  </select>
                </label>
                <label>
                  Proximo paso
                  <input
                    value={workForm.nextStep}
                    onChange={(event) => setWorkForm({ ...workForm, nextStep: event.target.value })}
                  />
                </label>
                <button className="button primary" type="submit">
                  Crear proceso
                </button>
              </form>
            </article>
            <article className="panel span-7 ida-panel">
              <div className="section-title">
                <div>
                  <p className="eyebrow">Procesos del jugador</p>
                  <h2>Contenido vivo dentro de I.D.A. Elite</h2>
                </div>
                <FileText size={22} />
              </div>
              <div className="ida-workflow-list">
                {workItems.map((item) => (
                  <article key={`${item.title}-${item.owner}`}>
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.type} - {item.owner}</span>
                      <p>{item.nextStep}</p>
                    </div>
                    <StatusPill tone={item.status === "validado" ? "success" : "warning"}>{item.status}</StatusPill>
                    <small>{item.athlete ?? selectedAthlete.name}</small>
                  </article>
                ))}
              </div>
            </article>
          </section>
        </>
      )}

      {activeTab === "command" && (
        <>
          <section className="ida-context-strip">
            <div>
              <span>Perfil activo</span>
              <strong>{selectedAthlete.name}</strong>
            </div>
            <div>
              <span>Estado de acceso</span>
              <strong>{selectedAthlete.access}</strong>
            </div>
            <div>
              <span>Fuentes tomadas</span>
              <strong>{selectedAthlete.source}</strong>
            </div>
            <div>
              <span>Valor I.D.A.</span>
              <strong>{selectedAthlete.profileValue}/100</strong>
            </div>
          </section>
          <section className="ida-kpi-grid">
            {kpis.map((item) => (
              <article className="ida-kpi" key={item.label}>
                <div>
                  <span>{item.label}</span>
                  <StatusPill tone={item.tone}>{item.trend}</StatusPill>
                </div>
                <strong>
                  {item.value}
                  <small>{item.suffix}</small>
                </strong>
                <div className="ida-mini-line">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            ))}
          </section>

          <section className="module-grid">
            <article className="panel span-7 ida-panel">
              <div className="section-title">
                <div>
                  <p className="eyebrow">Timeline evolutivo</p>
                  <h2>Evolucion historica del jugador</h2>
                </div>
                <LineChart size={22} />
              </div>
              <div className="ida-timeline">
                {["Base fisica consolidada", "Mejora tecnica sostenida", "Alerta de carga moderada", "Proyeccion elite regional"].map((step, index) => (
                  <div key={step}>
                    <span>{`T${index + 1}`}</span>
                    <p>{step}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="panel span-5 ida-panel">
              <div className="section-title">
                <div>
                  <p className="eyebrow">Alertas inteligentes</p>
                  <h2>Insights automaticos</h2>
                </div>
                <Sparkles size={22} />
              </div>
              <div className="ida-insights">
                {insights.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </article>
          </section>
        </>
      )}

      {activeTab === "biometrics" && (
        <section className="module-grid">
          <article className="panel span-7 ida-panel">
            <div className="section-title">
              <div>
                <p className="eyebrow">Biometria deportiva</p>
                <h2>Score biometrico general {biometricScore}/100</h2>
              </div>
              <HeartPulse size={22} />
            </div>
            <div className="ida-biometric-grid">
              {records.map((item) => (
                <div className="ida-biometric-card" key={`${item.metric}-${item.value}`}>
                  <span>{item.metric}</span>
                  <strong>{item.value}</strong>
                  <small>{item.delta}</small>
                  {item.athlete && <small>{item.athlete} - {item.validatedBy}</small>}
                  <div className="ida-bar-track">
                    <span style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="panel span-5 ida-panel">
            <div className="section-title">
              <div>
                <p className="eyebrow">Carga manual</p>
                <h2>Nuevo registro</h2>
              </div>
              <Activity size={22} />
            </div>
            <form className="ida-form" onSubmit={saveBiometric}>
              <label>
                Variable
                <input
                  value={biometricForm.metric}
                  onChange={(event) => setBiometricForm({ ...biometricForm, metric: event.target.value })}
                />
              </label>
              <label>
                Valor
                <input
                  value={biometricForm.value}
                  onChange={(event) => setBiometricForm({ ...biometricForm, value: event.target.value })}
                />
              </label>
              <label>
                Variacion
                <input
                  value={biometricForm.delta}
                  onChange={(event) => setBiometricForm({ ...biometricForm, delta: event.target.value })}
                />
              </label>
              <label>
                Score
                <input
                  max="100"
                  min="0"
                  type="number"
                  value={biometricForm.score}
                  onChange={(event) => setBiometricForm({ ...biometricForm, score: event.target.value })}
                />
              </label>
              <label>
                Responsable
                <input
                  value={biometricForm.loadedBy}
                  onChange={(event) => setBiometricForm({ ...biometricForm, loadedBy: event.target.value })}
                />
              </label>
              <label>
                Rol
                <select
                  value={biometricForm.role}
                  onChange={(event) => setBiometricForm({ ...biometricForm, role: event.target.value })}
                >
                  {loaderRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Validacion
                <select
                  value={biometricForm.validation}
                  onChange={(event) => setBiometricForm({ ...biometricForm, validation: event.target.value })}
                >
                  <option>pendiente FederalTrust</option>
                  <option>validado por club</option>
                  <option>requiere firma medica</option>
                  <option>requiere tutor</option>
                  <option>solo auditoria interna</option>
                </select>
              </label>
              <button className="button primary" type="submit">
                Guardar biometria trazable
              </button>
            </form>
            <p className="ida-note">
              La carga queda asociada a {selectedAthlete.name}, al responsable declarado y a una
              validacion futura FederalTrust.
            </p>
          </article>
        </section>
      )}

      {activeTab === "profile" && (
        <section className="panel ida-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Perfil 360 del jugador</p>
              <h2>Evaluacion integral avanzada</h2>
            </div>
            <Eye size={22} />
          </div>
          <div className="ida-profile-grid">
            {profileAreas.map(([area, score, detail]) => (
              <article key={area}>
                <div>
                  <strong>{area}</strong>
                  <b>{score}</b>
                </div>
                <p>{detail}</p>
                <div className="ida-bar-track">
                  <span style={{ width: `${score}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "scouting" && (
        <section className="panel ida-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Scouting inteligente</p>
              <h2>Ranking, proyeccion y comparador</h2>
            </div>
            <Radar size={22} />
          </div>
          <div className="ida-athlete-table">
            {athletes.map((athlete) => (
              <article key={athlete.name}>
                <div>
                  <strong>{athlete.name}</strong>
                  <span>{athlete.club} - {athlete.role} - {athlete.age} anos</span>
                  <small>{athlete.access} - {athlete.source}</small>
                </div>
                <b>{athlete.index}</b>
                <span>Proyeccion {athlete.projection}</span>
                <StatusPill tone={athlete.risk === "Bajo" ? "success" : "warning"}>{athlete.risk}</StatusPill>
                <p>{athlete.trend}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "analytics" && (
        <section className="module-grid">
          <article className="panel span-7 ida-panel">
            <div className="section-title">
              <div>
                <p className="eyebrow">Performance analytics</p>
                <h2>Temporada, consistencia y benchmark</h2>
              </div>
              <LineChart size={22} />
            </div>
            <div className="ida-bars">
              {performanceSeries.map((item) => (
                <BarRow key={item.label} {...item} />
              ))}
            </div>
          </article>
          <article className="panel span-5 ida-panel ida-radar">
            <Target size={28} />
            <h2>Radar de evolucion</h2>
            <div className="ida-radar-shape">
              <span />
            </div>
            <p>Comparativa tecnica, fisica, tactica, emocional, medica y conductual.</p>
          </article>
        </section>
      )}

      {activeTab === "medicine" && (
        <section className="panel ida-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Medicina + prevencion</p>
              <h2>Protocolos, riesgo y retorno progresivo</h2>
            </div>
            <Cross size={22} />
          </div>
          <div className="ida-protocols">
            {medicalProtocols.map(([title, status, action]) => (
              <article key={title}>
                <strong>{title}</strong>
                <StatusPill tone={status === "Vigente" ? "success" : "warning"}>{status}</StatusPill>
                <p>{action}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "psychology" && (
        <section className="panel ida-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Panel privado configurable</p>
              <h2>Psicologia deportiva</h2>
            </div>
            <Lock size={22} />
          </div>
          <div className="ida-profile-grid">
            {["Tolerancia a frustracion", "Estabilidad emocional", "Motivacion", "Resiliencia", "Presion competitiva", "Concentracion", "Liderazgo", "Gestion emocional"].map((label, index) => (
              <article key={label}>
                <div>
                  <strong>{label}</strong>
                  <b>{72 + index * 3}</b>
                </div>
                <p>Acceso restringido por permisos profesionales y consentimiento.</p>
                <div className="ida-bar-track">
                  <span style={{ width: `${72 + index * 3}%` }} />
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "wellbeing" && (
        <section className="panel ida-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Epigenetica y bienestar</p>
              <h2>Habitos que influyen en rendimiento saludable</h2>
            </div>
            <Waves size={22} />
          </div>
          <div className="ida-wellbeing-grid">
            {["Sueno", "Descanso", "Recuperacion", "Hidratacion", "Nutricion", "Suplementacion", "Ambiente", "Estres"].map((item) => (
              <article key={item}>
                <strong>{item}</strong>
                <p>Sugerencia informativa, sin reemplazar criterio profesional.</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "academy" && (
        <section className="panel ida-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Formacion y desarrollo</p>
              <h2>Academia integrada</h2>
            </div>
            <Trophy size={22} />
          </div>
          <div className="ida-academy">
            {["Objetivos deportivos", "Capacitaciones", "Logros e insignias", "Certificaciones", "Seguimiento DT/PF", "Familia y club"].map((item) => (
              <article key={item}>
                <BadgeCheck size={20} />
                <strong>{item}</strong>
                <span>vinculado al plan integral del jugador</span>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "ai" && (
        <section className="panel ida-panel ida-ai">
          <div className="section-title">
            <div>
              <p className="eyebrow">AI Insights</p>
              <h2>Inteligencia deportiva aplicada</h2>
            </div>
            <Sparkles size={22} />
          </div>
          <div className="ida-ai-grid">
            {["Reporte automatico", "Riesgo detectado", "Caida de rendimiento", "Entrenamiento sugerido", "Talento emergente", "Proyeccion federativa"].map((item) => (
              <article key={item}>
                <Sparkles size={18} />
                <strong>{item}</strong>
                <p>Motor preparado para IA con revision profesional y trazabilidad.</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTab === "youth" && (
        <section className="panel ida-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">I.D.A. Elite infanto juvenil</p>
              <h2>Proteccion, pedagogia y desarrollo saludable</h2>
            </div>
            <ShieldCheck size={22} />
          </div>
          <div className="ida-youth">
            <article>
              <strong>5-12 anos</strong>
              <p>Coordinacion, juego, bienestar, consentimiento parental y privacidad reforzada.</p>
            </article>
            <article>
              <strong>13-17 anos</strong>
              <p>Progresion saludable, carga controlada, neurodesarrollo y tutor autorizado.</p>
            </article>
            <article>
              <strong>Principio rector</strong>
              <p>No adultizar metricas infantiles ni promover sobreexigencia competitiva.</p>
            </article>
          </div>
        </section>
      )}

      {activeTab === "trust" && (
        <section className="panel ida-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Compatibilidad FederalTrust</p>
              <h2>Trust & Traceability Layer</h2>
            </div>
            <FileText size={22} />
          </div>
          <div className="ida-trust-grid">
            {["Auditable", "QR verificable", "Timestamp", "Hash", "Firma institucional", "Cadena de custodia", "Validacion", "Evidencia digital"].map((item) => (
              <article key={item}>
                <BadgeCheck size={18} />
                <strong>{item}</strong>
              </article>
            ))}
          </div>
          <div className="ida-permissions">
            {rolePermissions.map(([role, scope]) => (
              <div key={role}>
                <strong>{role}</strong>
                <span>{scope}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
