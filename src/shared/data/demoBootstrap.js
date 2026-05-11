const demoSeed = {
  users: [
    {
      id: "usr-demo-admin",
      name: "Administracion Demo",
      email: "demo@pcd.pro",
      role: "Administrador",
      scope: "Demo publica"
    }
  ],
  roles: [
    { id: "admin", name: "Administrador", permissions: ["platform:demo"] },
    { id: "league", name: "Liga", permissions: ["league:demo"] },
    { id: "club", name: "Club", permissions: ["club:demo"] },
    { id: "referee", name: "Arbitro", permissions: ["match:demo"] },
    { id: "staff", name: "DT/PF/Staff", permissions: ["training:demo"] },
    { id: "player", name: "Jugador", permissions: ["profile:demo"] }
  ],
  leagues: [
    {
      id: "lea-demo-sur",
      name: "Liga Demo Sur",
      region: "Territorio Demo",
      season: "2026 Apertura",
      status: "Activa"
    }
  ],
  clubs: [
    {
      id: "clu-demo-norte",
      name: "Club Norte Demo",
      leagueId: "lea-demo-sur",
      teams: 4,
      players: 48,
      status: "Afiliado"
    },
    {
      id: "clu-demo-sur",
      name: "Club Sur Demo",
      leagueId: "lea-demo-sur",
      teams: 3,
      players: 36,
      status: "Afiliado"
    }
  ],
  tournaments: [
    {
      id: "tor-demo-u13",
      name: "Copa Demo U13",
      leagueId: "lea-demo-sur",
      category: "U13 Mixto",
      format: "Todos contra todos",
      status: "En curso"
    }
  ],
  players: [
    {
      id: "pla-demo-1",
      name: "Jugador Demo 1",
      clubId: "clu-demo-norte",
      category: "U13",
      position: "Delantero",
      identityStatus: "Validada",
      score: 82
    },
    {
      id: "pla-demo-2",
      name: "Jugador Demo 2",
      clubId: "clu-demo-sur",
      category: "U13",
      position: "Arquero",
      identityStatus: "Pendiente",
      score: 76
    }
  ],
  matches: [
    {
      id: "mat-demo-1",
      tournamentId: "tor-demo-u13",
      homeClubId: "clu-demo-norte",
      awayClubId: "clu-demo-sur",
      date: "2026-05-16T10:00:00-03:00",
      venue: "Cancha Demo",
      referee: "Arbitro Demo",
      status: "Programado",
      score: null
    }
  ],
  disciplinaryCases: [],
  gameChallenges: [
    {
      id: "gam-demo-1",
      name: "Reto Precision Demo",
      mode: "Tecnico",
      category: "U13",
      points: 120,
      status: "Activo",
      description: "Desafio demo para mostrar el modulo Juego DT."
    }
  ],
  auditLogs: [
    {
      id: "aud-demo-1",
      action: "demo.open",
      actor: "Visitante demo",
      target: "Portfolio publico",
      detail: "Sesion demo iniciada sin datos sensibles.",
      createdAt: "2026-05-11T00:00:00.000Z"
    }
  ]
};

export function getDemoBootstrap() {
  const stored = window.localStorage.getItem("pcd-demo-db");
  const db = stored ? JSON.parse(stored) : structuredClone(demoSeed);
  db.summary = getSummary(db);
  return db;
}

export function createDemoRecord(endpoint, payload) {
  const db = getDemoBootstrap();
  const collectionName = endpointToCollection[endpoint];

  if (!collectionName) {
    throw new Error("Modulo demo no disponible.");
  }

  const record = {
    id: `${prefixByCollection[collectionName]}-${Date.now().toString(36)}`,
    ...payload,
    createdAt: new Date().toISOString()
  };

  db[collectionName].push(record);
  db.auditLogs.unshift({
    id: `aud-${Date.now().toString(36)}`,
    action: `${collectionName}.demoCreate`,
    actor: "Visitante demo",
    target: record.name ?? record.id,
    detail: "Registro creado en modo demo local.",
    createdAt: new Date().toISOString()
  });
  delete db.summary;
  window.localStorage.setItem("pcd-demo-db", JSON.stringify(db));
  return record;
}

function getSummary(db) {
  return {
    users: db.users.length,
    roles: db.roles.length,
    leagues: db.leagues.length,
    clubs: db.clubs.length,
    tournaments: db.tournaments.length,
    players: db.players.length,
    matches: db.matches.length,
    disciplinaryCases: db.disciplinaryCases.length,
    gameChallenges: db.gameChallenges.length,
    auditLogs: db.auditLogs.length
  };
}

const endpointToCollection = {
  leagues: "leagues",
  clubs: "clubs",
  tournaments: "tournaments",
  players: "players",
  "game-challenges": "gameChallenges"
};

const prefixByCollection = {
  leagues: "lea",
  clubs: "clu",
  tournaments: "tor",
  players: "pla",
  gameChallenges: "gam"
};
