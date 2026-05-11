import { useMemo, useState } from "react";
import { createRecord } from "../../../shared/api/client.js";
import { useI18n } from "../../../shared/i18n/I18nContext.jsx";
import { StatusPill } from "../../../shared/ui/StatusPill.jsx";

const entityConfig = {
  leagues: {
    label: "Liga",
    endpoint: "leagues",
    initialValues: {
      name: "",
      region: "",
      season: "2026 Apertura",
      status: "Preparacion"
    },
    fields: [
      { name: "name", label: "Nombre", type: "text" },
      { name: "region", label: "Region", type: "text" },
      { name: "season", label: "Temporada", type: "text" },
      { name: "status", label: "Estado", type: "text" }
    ]
  },
  clubs: {
    label: "Club",
    endpoint: "clubs",
    initialValues: {
      name: "",
      leagueId: "",
      teams: 1,
      players: 0,
      status: "Revision"
    },
    fields: [
      { name: "name", label: "Nombre", type: "text" },
      { name: "leagueId", label: "Liga", type: "select", source: "leagues" },
      { name: "teams", label: "Equipos", type: "number" },
      { name: "players", label: "Jugadores", type: "number" },
      { name: "status", label: "Estado", type: "text" }
    ]
  },
  tournaments: {
    label: "Torneo",
    endpoint: "tournaments",
    initialValues: {
      name: "",
      leagueId: "",
      category: "",
      format: "Todos contra todos",
      status: "Preparacion"
    },
    fields: [
      { name: "name", label: "Nombre", type: "text" },
      { name: "leagueId", label: "Liga", type: "select", source: "leagues" },
      { name: "category", label: "Categoria", type: "text" },
      { name: "format", label: "Formato", type: "text" },
      { name: "status", label: "Estado", type: "text" }
    ]
  },
  players: {
    label: "Jugador",
    endpoint: "players",
    initialValues: {
      name: "",
      clubId: "",
      category: "",
      position: "",
      identityStatus: "Pendiente",
      score: 50
    },
    fields: [
      { name: "name", label: "Nombre", type: "text" },
      { name: "clubId", label: "Club", type: "select", source: "clubs" },
      { name: "category", label: "Categoria", type: "text" },
      { name: "position", label: "Posicion", type: "text" },
      { name: "identityStatus", label: "Identidad", type: "text" },
      { name: "score", label: "Scoring", type: "number" }
    ]
  },
  gameChallenges: {
    label: "Juego DT",
    endpoint: "game-challenges",
    initialValues: {
      name: "",
      mode: "Tecnico",
      category: "",
      points: 100,
      status: "Preparacion",
      description: ""
    },
    fields: [
      { name: "name", label: "Nombre del reto", type: "text" },
      { name: "mode", label: "Modo", type: "text" },
      { name: "category", label: "Categoria", type: "text" },
      { name: "points", label: "Puntos", type: "number" },
      { name: "status", label: "Estado", type: "text" },
      { name: "description", label: "Descripcion", type: "text" }
    ]
  }
};

export function AdminCreatePanel({ apiState, clubs, leagues, tournaments, onCreated, token }) {
  const { t } = useI18n();
  const text = t.admin;
  const [entityKey, setEntityKey] = useState("leagues");
  const [formValues, setFormValues] = useState(entityConfig.leagues.initialValues);
  const [submitState, setSubmitState] = useState({ status: "idle", message: "" });

  const currentConfig = entityConfig[entityKey];

  const sources = useMemo(
    () => ({
      clubs,
      leagues,
      tournaments
    }),
    [clubs, leagues, tournaments]
  );

  function handleEntityChange(nextEntityKey) {
    setEntityKey(nextEntityKey);
    setFormValues(entityConfig[nextEntityKey].initialValues);
    setSubmitState({ status: "idle", message: "" });
  }

  function handleFieldChange(name, value, type) {
    setFormValues((current) => ({
      ...current,
      [name]: type === "number" ? Number(value) : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState({ status: "saving", message: text.saving });

    try {
      const created = await createRecord(currentConfig.endpoint, formValues, token);
      await onCreated();
      setFormValues(currentConfig.initialValues);
      setSubmitState({
        status: "success",
        message: `${text.entities[entityKey]} ${text.created}: ${created.name ?? created.id}`
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message: error.message
      });
    }
  }

  const isApiReady = apiState.status === "connected" || apiState.status === "refreshing";

  return (
    <section className="panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">{text.eyebrow}</p>
          <h2>{text.title}</h2>
        </div>
        <StatusPill tone={isApiReady ? "success" : "warning"}>
          {isApiReady ? text.apiReady : text.apiRequired}
        </StatusPill>
      </div>

      <div className="admin-create-layout">
        <div className="entity-switcher" role="tablist" aria-label={text.recordType}>
          {Object.entries(entityConfig).map(([key, config]) => (
            <button
              className={entityKey === key ? "active" : ""}
              key={key}
              onClick={() => handleEntityChange(key)}
              type="button"
            >
              {text.entities[key] ?? config.label}
            </button>
          ))}
        </div>

        <form className="record-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {currentConfig.fields.map((field) => (
              <label key={field.name}>
                <span>{text.fields[field.name] ?? field.label}</span>
                {field.type === "select" ? (
                  <select
                    required
                    value={formValues[field.name]}
                    onChange={(event) => handleFieldChange(field.name, event.target.value, field.type)}
                  >
                    <option value="">{text.select}</option>
                    {(sources[field.source] ?? []).map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    required
                    min={field.type === "number" ? 0 : undefined}
                    type={field.type}
                    value={formValues[field.name]}
                    onChange={(event) => handleFieldChange(field.name, event.target.value, field.type)}
                  />
                )}
              </label>
            ))}
          </div>

          <div className="form-footer">
            <button className="button primary" disabled={!isApiReady || submitState.status === "saving"} type="submit">
              {text.save} {text.entities[entityKey] ?? currentConfig.label}
            </button>
            {submitState.message && (
              <p className={`form-message ${submitState.status}`}>{submitState.message}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
