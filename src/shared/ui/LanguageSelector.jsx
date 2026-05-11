import { useI18n } from "../i18n/I18nContext.jsx";

export function LanguageSelector({ compact = false }) {
  const { language, setLanguage, t } = useI18n();

  return (
    <label className={`language-selector ${compact ? "compact" : ""}`}>
      <span>{t.languageLabel}</span>
      <select value={language} onChange={(event) => setLanguage(event.target.value)}>
        <option value="es">{t.spanish}</option>
        <option value="en">{t.english}</option>
      </select>
    </label>
  );
}
