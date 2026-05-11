import { useMemo, useState } from "react";
import { StatusPill } from "../../../shared/ui/StatusPill.jsx";

const tableConfig = {
  leagues: {
    label: "Ligas",
    empty: "Todavia no hay ligas cargadas.",
    columns: [
      { key: "name", label: "Liga" },
      { key: "region", label: "Region" },
      { key: "season", label: "Temporada" },
      { key: "status", label: "Estado" }
    ]
  },
  clubs: {
    label: "Clubes",
    empty: "Todavia no hay clubes cargados.",
    columns: [
      { key: "name", label: "Club" },
      { key: "leagueName", label: "Liga" },
      { key: "teams", label: "Equipos" },
      { key: "players", label: "Jugadores" },
      { key: "status", label: "Estado" }
    ]
  },
  tournaments: {
    label: "Torneos",
    empty: "Todavia no hay torneos cargados.",
    columns: [
      { key: "name", label: "Torneo" },
      { key: "leagueName", label: "Liga" },
      { key: "category", label: "Categoria" },
      { key: "format", label: "Formato" },
      { key: "status", label: "Estado" }
    ]
  },
  players: {
    label: "Jugadores",
    empty: "Todavia no hay jugadores cargados.",
    columns: [
      { key: "name", label: "Jugador" },
      { key: "clubName", label: "Club" },
      { key: "category", label: "Categoria" },
      { key: "position", label: "Posicion" },
      { key: "identityStatus", label: "Identidad" },
      { key: "score", label: "Scoring" }
    ]
  },
  matches: {
    label: "Partidos",
    empty: "Todavia no hay partidos cargados.",
    columns: [
      { key: "tournamentName", label: "Torneo" },
      { key: "homeClubName", label: "Local" },
      { key: "awayClubName", label: "Visitante" },
      { key: "dateLabel", label: "Fecha" },
      { key: "venue", label: "Sede" },
      { key: "status", label: "Estado" }
    ]
  },
  gameChallenges: {
    label: "Juego DT",
    empty: "Todavia no hay desafios del Juego DT cargados.",
    columns: [
      { key: "name", label: "Reto" },
      { key: "mode", label: "Modo" },
      { key: "category", label: "Categoria" },
      { key: "points", label: "Puntos" },
      { key: "status", label: "Estado" },
      { key: "description", label: "Descripcion" }
    ]
  }
};

export function RecordsPanel({ apiState, data }) {
  const [activeTable, setActiveTable] = useState("leagues");
  const currentConfig = tableConfig[activeTable];

  const rowsByTable = useMemo(() => buildRows(data), [data]);
  const rows = rowsByTable[activeTable] ?? [];
  const isApiReady = apiState.status === "connected" || apiState.status === "refreshing";

  return (
    <section className="panel">
      <div className="section-title">
        <div>
          <p className="eyebrow">Registros guardados</p>
          <h2>Listados operativos</h2>
        </div>
        <StatusPill tone={isApiReady ? "success" : "warning"}>
          {isApiReady ? `${rows.length} visibles` : "Sin conexion"}
        </StatusPill>
      </div>

      <div className="records-tabs" role="tablist" aria-label="Listados de registros">
        {Object.entries(tableConfig).map(([key, config]) => (
          <button
            className={activeTable === key ? "active" : ""}
            key={key}
            onClick={() => setActiveTable(key)}
            type="button"
          >
            {config.label}
          </button>
        ))}
      </div>

      {!isApiReady ? (
        <p className="api-message">Inicia la API para ver los registros persistidos.</p>
      ) : rows.length === 0 ? (
        <p className="api-message">{currentConfig.empty}</p>
      ) : (
        <div className="records-table-wrap">
          <table className="records-table">
            <thead>
              <tr>
                {currentConfig.columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {currentConfig.columns.map((column) => (
                    <td key={column.key}>{formatCell(row[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function buildRows(data) {
  if (!data) {
    return {};
  }

  const leagueById = toMap(data.leagues);
  const clubById = toMap(data.clubs);
  const tournamentById = toMap(data.tournaments);

  return {
    leagues: data.leagues ?? [],
    clubs: (data.clubs ?? []).map((club) => ({
      ...club,
      leagueName: leagueById.get(club.leagueId)?.name ?? "Sin liga"
    })),
    tournaments: (data.tournaments ?? []).map((tournament) => ({
      ...tournament,
      leagueName: leagueById.get(tournament.leagueId)?.name ?? "Sin liga"
    })),
    players: (data.players ?? []).map((player) => ({
      ...player,
      clubName: clubById.get(player.clubId)?.name ?? "Sin club"
    })),
    matches: (data.matches ?? []).map((match) => ({
      ...match,
      tournamentName: tournamentById.get(match.tournamentId)?.name ?? "Sin torneo",
      homeClubName: clubById.get(match.homeClubId)?.name ?? "Sin club",
      awayClubName: clubById.get(match.awayClubId)?.name ?? "Sin club",
      dateLabel: formatDate(match.date)
    })),
    gameChallenges: data.gameChallenges ?? []
  };
}

function toMap(records = []) {
  return new Map(records.map((record) => [record.id, record]));
}

function formatCell(value) {
  if (value === null || value === undefined || value === "") {
    return "Sin dato";
  }

  return String(value);
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}
