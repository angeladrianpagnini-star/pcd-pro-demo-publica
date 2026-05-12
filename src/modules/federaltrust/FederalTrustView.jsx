import {
  Archive,
  BadgeCheck,
  Building2,
  ClipboardList,
  FileCheck2,
  FolderLock,
  Gavel,
  Landmark,
  Scale,
  ShieldCheck,
  Signature,
  Workflow
} from "lucide-react";
import { StatusPill } from "../../shared/ui/StatusPill.jsx";

const federalTrustAreas = [
  {
    title: "Certificacion digital",
    text: "Alta de tramite, revision documental, firma, hash, QR y constancia verificable.",
    href: "./federaltrust/upload.html",
    Icon: FileCheck2
  },
  {
    title: "Trazabilidad legal",
    text: "Cadena de custodia, eventos auditables y registro inmutable del paquete probatorio.",
    href: "./federaltrust/audit_trail.html",
    Icon: ShieldCheck
  },
  {
    title: "Pasaporte documental deportivo",
    text: "Ficha, autorizaciones, aptos, seguros, consentimientos y repositorio seguro por atleta.",
    href: "./federaltrust/sports_passport.html",
    Icon: FolderLock
  },
  {
    title: "Contratos deportivos federados",
    text: "Agente FIFA, repertorio contractual, constructor de clausulas, partes, firmas y archivo.",
    href: "./federaltrust/sports_contracts.html",
    Icon: Signature
  },
  {
    title: "Mesa institucional",
    text: "Recepcion, observacion, validacion y comunicacion de estados con ligas o federaciones.",
    href: "./federaltrust/institution_workspace.html",
    Icon: Building2
  },
  {
    title: "Organismo regulador",
    text: "Validacion de escribanos, decision regulatoria y evidencia de consulta institucional.",
    href: "./federaltrust/regulator.html",
    Icon: Landmark
  },
  {
    title: "Mesa de escribano",
    text: "Bandeja notarial para revisar expedientes, certificar actos y conservar evidencia.",
    href: "./federaltrust/notary_workspace.html",
    Icon: Gavel
  },
  {
    title: "Repositorio documental",
    text: "Contratos, certificados, hash, QR, archivo federado y consulta posterior.",
    href: "./federaltrust/sports_archive.html",
    Icon: Archive
  }
];

const workflowSteps = [
  "Tramite creado",
  "Identidad y partes verificadas",
  "Documento cargado o construido",
  "Firma y consentimiento",
  "Validacion institucional o federativa",
  "Certificacion notarial",
  "Archivo y auditoria"
];

const evidenceItems = [
  "Hash SHA-256",
  "QR verificable",
  "Sello temporal",
  "Eventos de auditoria",
  "Paquete probatorio",
  "Repositorio federado"
];

export function FederalTrustView() {
  return (
    <div className="view-stack federaltrust-view">
      <section className="federaltrust-hero">
        <div>
          <p className="eyebrow">Linea de producto complementaria</p>
          <h1>FederalTrust</h1>
          <p className="federaltrust-tagline">Digital Certification &amp; Legal Traceability</p>
          <p>
            Modulo de confianza documental para PCD Pro: certificacion digital, trazabilidad
            legal, pasaporte documental deportivo, contratos federados, mesas institucionales y
            evidencia verificable.
          </p>
          <div className="federaltrust-actions">
            <a className="silver-action primary" href="./federaltrust/index.html">
              Abrir experiencia FederalTrust
            </a>
            <a className="silver-action" href="./federaltrust/strategy.html">
              Ver encaje con PCD Pro
            </a>
          </div>
        </div>
        <div className="trust-mark" aria-hidden="true">
          <Scale size={54} />
          <span>FT</span>
        </div>
      </section>

      <section className="federaltrust-grid">
        {federalTrustAreas.map(({ title, text, href, Icon }) => (
          <a className="trust-card" href={href} key={title}>
            <Icon size={22} />
            <strong>{title}</strong>
            <span>{text}</span>
          </a>
        ))}
      </section>

      <section className="module-grid">
        <article className="panel span-7 trust-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Estados de tramite</p>
              <h2>Workflow legal y deportivo</h2>
            </div>
            <Workflow size={22} />
          </div>
          <div className="trust-timeline">
            {workflowSteps.map((step, index) => (
              <div className="trust-step" key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="panel span-5 trust-panel">
          <div className="section-title">
            <div>
              <p className="eyebrow">Repositorio documental</p>
              <h2>Evidencia conservada</h2>
            </div>
            <ClipboardList size={22} />
          </div>
          <div className="trust-evidence">
            {evidenceItems.map((item) => (
              <StatusPill tone="info" key={item}>
                {item}
              </StatusPill>
            ))}
          </div>
          <div className="trust-note">
            <BadgeCheck size={20} />
            <p>
              La demo publica usa almacenamiento local. En PCD Pro, estos eventos deben conectarse
              con los servicios canonicos de identidad, permisos, auditoria y custodia documental.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
