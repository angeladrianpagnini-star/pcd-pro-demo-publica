import { useMemo, useState } from "react";
import {
  AlertTriangle,
  BookOpen,
  FileUp,
  LifeBuoy,
  MapPin,
  MessageSquareText,
  Phone,
  Search,
  ShieldAlert,
  UsersRound
} from "lucide-react";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";

const riskAreas = [
  {
    title: "Violencias y abuso",
    level: "urgente",
    signals: "miedo persistente, lesiones, relatos de abuso, control extremo, amenazas, aislamiento",
    route: "137, 911 si hay urgencia, servicio local de ninez, fiscalia o comisaria"
  },
  {
    title: "Bullying y hostigamiento",
    level: "alto",
    signals: "rechazo a asistir, cambios bruscos, humillaciones, cyberacoso, perdida de pertenencia",
    route: "equipo escolar, familia, club, psicologia, area local de ninez si hay vulneracion"
  },
  {
    title: "Consumos problematicos",
    level: "medio",
    signals: "cambios de habitos, ausencias, consumo, deterioro de vinculos o rendimiento",
    route: "141 SEDRONAR, salud mental, dispositivos territoriales y adultos responsables"
  },
  {
    title: "Salud mental y autolesiones",
    level: "urgente",
    signals: "ideacion suicida, autolesiones, desesperanza, crisis de panico, abandono de autocuidado",
    route: "911 si hay riesgo inminente, guardia de salud, salud mental local, adulto responsable"
  },
  {
    title: "Desarrollo, motricidad y aprendizaje",
    level: "seguimiento",
    signals: "retrasos motores, dificultades persistentes, dolor, fatiga, barreras escolares",
    route: "pediatria, psicopedagogia, neurologia, kinesiologia, escuela y familia"
  },
  {
    title: "Familia y acceso a derechos",
    level: "orientacion",
    signals: "falta de documentacion, abandono, conflicto familiar, impedimento de contacto, alimentos",
    route: "CAJ, servicio local, trabajador social, defensorias y organismos de ninez"
  }
];

const officialResources = [
  {
    name: "Linea 102",
    topic: "Ninez y adolescencia",
    contact: "102",
    scope: "Escucha, contencion y orientacion ante vulneracion de derechos.",
    source: "https://www.argentina.gob.ar/capital-humano/familia/ninez-y-adolescencia/linea-102"
  },
  {
    name: "Linea 137",
    topic: "Violencia familiar, sexual y grooming",
    contact: "137 / WhatsApp 11-3133-1000",
    scope: "Atencion gratuita 24 horas ante violencia familiar o sexual.",
    source: "https://www.argentina.gob.ar/servicio/violencia-familiar-y-sexual"
  },
  {
    name: "Linea 144",
    topic: "Violencia por motivos de genero",
    contact: "144",
    scope: "Atencion, contencion y asesoramiento gratuito 24/7.",
    source: "https://www.argentina.gob.ar/linea-144"
  },
  {
    name: "SEDRONAR",
    topic: "Consumos problematicos",
    contact: "141",
    scope: "Orientacion gratuita y anonima en todo el pais.",
    source: "https://www.argentina.gob.ar/salud/sedronar"
  },
  {
    name: "Centros de Acceso a la Justicia",
    topic: "Orientacion legal y psicosocial",
    contact: "Mapa CAJ",
    scope: "Atencion legal primaria gratuita presencial y remota.",
    source: "https://www.argentina.gob.ar/justicia/afianzar/caj"
  },
  {
    name: "CENAVID",
    topic: "Victimas de delitos",
    contact: "149",
    scope: "Asesoramiento juridico, psicologico y social a victimas.",
    source: "https://www.argentina.gob.ar/justicia/asistencia-victimas-delitos"
  }
];

const professionalNetwork = [
  "trabajo social",
  "servicio local de ninez",
  "pediatria",
  "psicologia",
  "psiquiatria",
  "psicopedagogia",
  "kinesiologia / motricidad",
  "acceso a la justicia",
  "defensoria",
  "institucion educativa",
  "club / referente deportivo",
  "familia o tutor responsable"
];

const initialMaterials = [
  { title: "Charla para familias sobre alertas tempranas", type: "video", audience: "familias", status: "publicable" },
  { title: "Protocolo interno ante violencia o abuso", type: "documento", audience: "clubes", status: "revision" },
  { title: "Guia rapida de cyberacoso y grooming", type: "pdf", audience: "adolescentes", status: "publicable" }
];

function detectCase(text) {
  const value = text.toLowerCase();
  const matches = [];

  if (/(abuso|sexual|violencia|golpe|amenaza|grooming)/.test(value)) {
    matches.push(["Prioridad urgente", "Activar adulto responsable, preservar evidencia y contactar 137 o 911 si hay riesgo inmediato."]);
  }
  if (/(bullying|hostigamiento|acoso|humilla|burla|cyber)/.test(value)) {
    matches.push(["Hostigamiento detectable", "Documentar hechos, involucrar institucion educativa/deportiva y acordar plan de proteccion."]);
  }
  if (/(droga|alcohol|consumo|adiccion|sustancia)/.test(value)) {
    matches.push(["Consumo problematico", "Orientar con 141 SEDRONAR y red de salud/acompanamiento familiar."]);
  }
  if (/(suicid|autolesion|cortar|morir|crisis|panico)/.test(value)) {
    matches.push(["Riesgo de salud mental", "No dejar sola a la persona; si hay riesgo inminente, llamar a emergencias o ir a guardia."]);
  }
  if (/(motric|desarrollo|aprendizaje|lenguaje|dolor|fatiga)/.test(value)) {
    matches.push(["Desarrollo o salud", "Derivar a pediatria/profesional competente y registrar seguimiento con consentimiento."]);
  }

  return matches.length
    ? matches
    : [["Orientacion inicial", "Registrar contexto, evitar conclusiones apresuradas y consultar red profesional/local competente."]];
}

export function RecurseroView() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Buenos Aires / Argentina");
  const [caseText, setCaseText] = useState("Adolescente con ausencias al club, aislamiento y mensajes de hostigamiento en redes.");
  const [materials, setMaterials] = useState(initialMaterials);
  const [materialForm, setMaterialForm] = useState({
    title: "Taller de prevencion para familias",
    type: "video",
    audience: "familias",
    status: "borrador"
  });

  const filteredResources = useMemo(() => {
    const term = query.toLowerCase();
    return officialResources.filter(
      (item) =>
        item.name.toLowerCase().includes(term) ||
        item.topic.toLowerCase().includes(term) ||
        item.scope.toLowerCase().includes(term)
    );
  }, [query]);

  const analysis = useMemo(() => detectCase(caseText), [caseText]);

  function addMaterial(event) {
    event.preventDefault();
    setMaterials((current) => [materialForm, ...current.slice(0, 5)]);
  }

  return (
    <div className="view-stack recursero-view">
      <section className="recursero-hero">
        <div>
          <p className="eyebrow">Recurso transversal PCD Pro</p>
          <h1>Recursero</h1>
          <p>
            Orientacion, prevencion y derivacion ante riesgos, vulnerabilidades y alertas en
            chicos, adolescentes, familias e instituciones deportivas.
          </p>
        </div>
        <div className="recursero-urgent">
          <AlertTriangle size={26} />
          <strong>Si hay peligro inmediato, no esperes el analisis del sistema.</strong>
          <span>Contactar emergencias locales o 911. Esta herramienta orienta y ordena caminos; no reemplaza organismos ni profesionales.</span>
        </div>
      </section>

      <section className="module-grid">
        <article className="panel span-7 recursero-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Mapa de riesgos</p>
              <h2>Alertas detectables y caminos de mitigacion</h2>
            </div>
            <ShieldAlert size={22} />
          </div>
          <div className="recursero-risk-grid">
            {riskAreas.map((risk) => (
              <article key={risk.title}>
                <div>
                  <strong>{risk.title}</strong>
                  <StatusPill tone={risk.level === "urgente" ? "warning" : "info"}>{risk.level}</StatusPill>
                </div>
                <p>{risk.signals}</p>
                <span>{risk.route}</span>
              </article>
            ))}
          </div>
        </article>

        <article className="panel span-5 recursero-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Plantear situacion</p>
              <h2>Analisis orientativo</h2>
            </div>
            <MessageSquareText size={22} />
          </div>
          <textarea
            className="recursero-textarea"
            value={caseText}
            onChange={(event) => setCaseText(event.target.value)}
          />
          <div className="recursero-analysis">
            {analysis.map(([title, action]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{action}</p>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="module-grid">
        <article className="panel span-7 recursero-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Busqueda por tema o territorio</p>
              <h2>Lineas y organismos oficiales</h2>
            </div>
            <Search size={22} />
          </div>
          <div className="recursero-search">
            <label>
              Tema
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="violencia, ninez, consumo, justicia" />
            </label>
            <label>
              Geolocalizacion de referencia
              <input value={location} onChange={(event) => setLocation(event.target.value)} />
            </label>
          </div>
          <div className="recursero-resource-list">
            {filteredResources.map((resource) => (
              <article key={resource.name}>
                <Phone size={18} />
                <div>
                  <strong>{resource.name}</strong>
                  <span>{resource.topic} - {resource.contact}</span>
                  <p>{resource.scope}</p>
                  <a href={resource.source} rel="noreferrer" target="_blank">
                    Fuente oficial
                  </a>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="panel span-5 recursero-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Red competente</p>
              <h2>Profesionales y dispositivos</h2>
            </div>
            <UsersRound size={22} />
          </div>
          <div className="recursero-network">
            {professionalNetwork.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="recursero-location">
            <MapPin size={20} />
            <p>Para {location}, el sistema queda preparado para priorizar servicios locales, CAJ, hospitales, areas de ninez y organismos territoriales cercanos.</p>
          </div>
        </article>
      </section>

      <section className="module-grid">
        <article className="panel span-5 recursero-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Material preventivo</p>
              <h2>Cargar recurso</h2>
            </div>
            <FileUp size={22} />
          </div>
          <form className="recursero-form" onSubmit={addMaterial}>
            <label>
              Titulo
              <input value={materialForm.title} onChange={(event) => setMaterialForm({ ...materialForm, title: event.target.value })} />
            </label>
            <label>
              Tipo
              <select value={materialForm.type} onChange={(event) => setMaterialForm({ ...materialForm, type: event.target.value })}>
                <option>video</option>
                <option>charla</option>
                <option>documento</option>
                <option>pdf</option>
                <option>campana</option>
              </select>
            </label>
            <label>
              Destinatario
              <select value={materialForm.audience} onChange={(event) => setMaterialForm({ ...materialForm, audience: event.target.value })}>
                <option>chicos</option>
                <option>adolescentes</option>
                <option>familias</option>
                <option>clubes</option>
                <option>profesionales</option>
              </select>
            </label>
            <label>
              Archivo demo
              <input accept=".pdf,.doc,.docx,.mp4,.mov,.jpg,.png,.ppt,.pptx" type="file" />
            </label>
            <button className="button primary" type="submit">Agregar material</button>
          </form>
        </article>

        <article className="panel span-7 recursero-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Biblioteca viva</p>
              <h2>Prevencion, charlas y protocolos</h2>
            </div>
            <BookOpen size={22} />
          </div>
          <div className="recursero-materials">
            {materials.map((material) => (
              <article key={`${material.title}-${material.type}`}>
                <LifeBuoy size={18} />
                <div>
                  <strong>{material.title}</strong>
                  <span>{material.type} - {material.audience}</span>
                </div>
                <StatusPill tone={material.status === "publicable" ? "success" : "warning"}>{material.status}</StatusPill>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
