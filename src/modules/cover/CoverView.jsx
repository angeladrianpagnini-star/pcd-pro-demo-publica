import coverImage from "../../assets/pcd-cover.png";
import { useI18n } from "../../shared/i18n/I18nContext.jsx";
import { LanguageSelector } from "../../shared/ui/LanguageSelector.jsx";
import { Logo } from "../../shared/ui/Logo.jsx";

export function CoverView({ onEnter }) {
  const { t } = useI18n();

  return (
    <main className="cover-page">
      <img className="cover-image" src={coverImage} alt="" />
      <div className="cover-overlay" />
      <div className="cover-language">
        <LanguageSelector />
      </div>
      <section className="cover-content">
        <Logo size={76} variant="light" />
        <p className="eyebrow">{t.coverEyebrow}</p>
        <h1>{t.platformName}</h1>
        <p>{t.coverCopy}</p>
        <button className="cover-button" onClick={onEnter} type="button">
          {t.coverCta}
        </button>
      </section>
    </main>
  );
}
