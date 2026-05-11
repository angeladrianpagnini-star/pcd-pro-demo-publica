import coverImage from "../../assets/pcd-cover.png";
import { Logo } from "../../shared/ui/Logo.jsx";

export function CoverView({ onEnter }) {
  return (
    <main className="cover-page">
      <img className="cover-image" src={coverImage} alt="" />
      <div className="cover-overlay" />
      <section className="cover-content">
        <Logo size={76} variant="light" />
        <p className="eyebrow">Plataforma deportiva territorial</p>
        <h1>PCD Pro</h1>
        <p>
          Competencias, identidad digital, datos deportivos, Juego DT y gestion institucional
          en una sola herramienta profesional.
        </p>
        <button className="cover-button" onClick={onEnter} type="button">
          Entrar a la plataforma
        </button>
      </section>
    </main>
  );
}
