import { useMemo, useState } from "react";
import {
  Activity,
  BadgeCheck,
  ClipboardList,
  HeartPulse,
  PackageCheck,
  Scale,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  UserRoundCheck
} from "lucide-react";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";

const bodyMetrics = [
  ["Peso", "67.4 kg", "seguimiento"],
  ["IMC", "21.8", "referencial"],
  ["Masa muscular", "42%", "medicion corporal"],
  ["Grasa corporal", "18%", "objetivo saludable"],
  ["Hidratacion", "91%", "optima"],
  ["Energia percibida", "7/10", "autorreporte"]
];

const consultationSteps = [
  ["Solicitud gratuita", "El usuario pide orientacion inicial con Dra. Sanae."],
  ["Evaluacion profesional", "Nutricion y suplementacion se revisan segun edad, contexto y objetivos."],
  ["Plan sugerido", "Se propone un camino informativo, sin reemplazar controles medicos."],
  ["Operacion comercial", "Si corresponde, un operador autorizado gestiona la venta final."],
  ["Seguimiento PCD", "La herramienta registra evolucion, adherencia y consentimiento."]
];

const productLines = [
  { name: "Programa bienestar diario", category: "Herbalife", status: "consulta previa" },
  { name: "Apoyo a hidratacion y recuperacion", category: "Herbalife", status: "evaluar objetivo" },
  { name: "Complemento proteico orientativo", category: "Herbalife", status: "segun perfil" },
  { name: "Habitos y educacion nutricional", category: "No producto", status: "base obligatoria" }
];

const warnings = [
  "Menores de edad requieren autorizacion familiar/tutor y criterio profesional.",
  "Suplementacion no reemplaza comida, tratamiento medico ni indicacion profesional.",
  "La venta debe quedar separada de la evaluacion profesional y registrada por operador.",
  "Alergias, patologias, medicacion o embarazo requieren derivacion medica previa."
];

export function HealthView() {
  const [profile, setProfile] = useState({
    name: "Lucia Ferreyra",
    objective: "mejorar energia y composicion corporal",
    age: "15",
    consent: "requiere tutor",
    operator: "Operador PCD Salud"
  });
  const [requests, setRequests] = useState([
    {
      person: "Mateo Alvarez",
      type: "consulta gratuita",
      status: "agendada con Dra. Sanae",
      objective: "recuperacion y nutricion deportiva"
    }
  ]);

  const healthScore = useMemo(() => {
    const base = Number(profile.age) < 18 ? 74 : 82;
    return profile.consent.includes("autorizado") ? base + 8 : base;
  }, [profile.age, profile.consent]);

  function createRequest(event) {
    event.preventDefault();
    setRequests((current) => [
      {
        person: profile.name,
        type: "consulta gratuita",
        status: "pendiente Dra. Sanae",
        objective: profile.objective
      },
      ...current.slice(0, 4)
    ]);
  }

  return (
    <div className="view-stack health-view">
      <section className="health-hero">
        <div>
          <p className="eyebrow">Salud, cuerpo y soporte nutricional</p>
          <h1>Salud y soporte</h1>
          <p>
            Espacio para consultas de cuidado corporal, nutricion, suplementacion, mediciones
            corporales y seguimiento profesional. Incluye consulta inicial gratuita con Dra. Sanae
            y circuito comercial separado para productos Herbalife operado desde PCD Pro.
          </p>
        </div>
        <div className="health-score">
          <HeartPulse size={28} />
          <strong>{healthScore}</strong>
          <span>indice orientativo</span>
        </div>
      </section>

      <section className="module-grid">
        <article className="panel span-5 health-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Consulta gratuita</p>
              <h2>Dra. Sanae</h2>
            </div>
            <Stethoscope size={22} />
          </div>
          <form className="health-form" onSubmit={createRequest}>
            <label>
              Persona / jugador
              <input value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} />
            </label>
            <label>
              Edad
              <input value={profile.age} onChange={(event) => setProfile({ ...profile, age: event.target.value })} />
            </label>
            <label>
              Objetivo de consulta
              <select value={profile.objective} onChange={(event) => setProfile({ ...profile, objective: event.target.value })}>
                <option>mejorar energia y composicion corporal</option>
                <option>ordenar habitos alimentarios</option>
                <option>evaluar suplementacion deportiva</option>
                <option>acompanar descenso o aumento de peso</option>
                <option>consulta familiar preventiva</option>
              </select>
            </label>
            <label>
              Consentimiento
              <select value={profile.consent} onChange={(event) => setProfile({ ...profile, consent: event.target.value })}>
                <option>requiere tutor</option>
                <option>tutor autorizado</option>
                <option>adulto responsable</option>
                <option>derivar a medico</option>
              </select>
            </label>
            <button className="button primary" type="submit">Solicitar consulta gratuita</button>
          </form>
        </article>

        <article className="panel span-7 health-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Analisis corporal</p>
              <h2>Mediciones y seguimiento</h2>
            </div>
            <Scale size={22} />
          </div>
          <div className="health-metrics">
            {bodyMetrics.map(([label, value, detail]) => (
              <article key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="health-note">
            <BadgeCheck size={20} />
            <p>Las mediciones son orientativas y deben ser interpretadas por profesional competente segun contexto, edad y salud general.</p>
          </div>
        </article>
      </section>

      <section className="module-grid">
        <article className="panel span-7 health-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Cadena profesional + comercial</p>
              <h2>Del asesoramiento a la operacion</h2>
            </div>
            <ClipboardList size={22} />
          </div>
          <div className="health-steps">
            {consultationSteps.map(([title, detail], index) => (
              <div key={title}>
                <span>{index + 1}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel span-5 health-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Linea de productos</p>
              <h2>Herbalife + operador PCD</h2>
            </div>
            <ShoppingBag size={22} />
          </div>
          <div className="health-products">
            {productLines.map((item) => (
              <article key={item.name}>
                <PackageCheck size={18} />
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.category}</span>
                </div>
                <StatusPill tone={item.category === "No producto" ? "info" : "warning"}>{item.status}</StatusPill>
              </article>
            ))}
          </div>
          <div className="health-operator">
            <UserRoundCheck size={20} />
            <p>Venta final asignada a {profile.operator}, con registro de solicitud, consentimiento y trazabilidad comercial.</p>
          </div>
        </article>
      </section>

      <section className="module-grid">
        <article className="panel span-5 health-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Solicitudes</p>
              <h2>Embudo activo</h2>
            </div>
            <Sparkles size={22} />
          </div>
          <div className="health-requests">
            {requests.map((request) => (
              <article key={`${request.person}-${request.objective}`}>
                <strong>{request.person}</strong>
                <span>{request.type}</span>
                <p>{request.objective}</p>
                <StatusPill tone={request.status.includes("agendada") ? "success" : "warning"}>{request.status}</StatusPill>
              </article>
            ))}
          </div>
        </article>

        <article className="panel span-7 health-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Cuidados y cumplimiento</p>
              <h2>Reglas de seguridad del circuito</h2>
            </div>
            <Activity size={22} />
          </div>
          <div className="health-warnings">
            {warnings.map((warning) => (
              <p key={warning}>{warning}</p>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
