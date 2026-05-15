import { createContext, useContext, useEffect, useMemo, useState } from "react";

const I18nContext = createContext(null);

const dictionaries = {
  es: {
    languageLabel: "Idioma",
    spanish: "Espanol",
    english: "Ingles",
    platformName: "PCD Pro",
    platformSubtitle: "Plataforma de Competencias Digitales",
    privateAccess: "Acceso privado",
    loginIntro: "Ingresa con una cuenta autorizada para administrar la plataforma.",
    password: "Contrasena",
    entering: "Ingresando...",
    enter: "Entrar",
    logout: "Salir",
    export: "Exportar",
    publicDemo: "Demo publica",
    coverEyebrow: "Plataforma deportiva territorial",
    coverCopy:
      "Competencias, identidad digital, datos deportivos, Juego DT y gestion institucional en una sola herramienta profesional.",
    coverCta: "Entrar a la plataforma",
    sidebarSubtitle: "Web + API + App mobile",
    dashboard: {
      heroEyebrow: "Operacion integral",
      heroTitle: "PCD Pro centraliza competencia, identidad, evidencia y sustentabilidad.",
      heroCopy:
        "Base preparada para convertir el informe funcional en una plataforma real para ligas, clubes, arbitros, cuerpos tecnicos, profesionales, sponsors y jugadores.",
      createTournament: "Crear torneo",
      auditMatchday: "Auditar jornada",
      backendEyebrow: "Backend local",
      backendTitle: "API inicial de PCD Pro",
      connected: "Conectada",
      waitingApi: "Esperando API",
      backendHelp: "Inicia el backend con",
      backendHelpEnd: "para ver datos servidos desde",
      users: "Usuarios",
      roles: "Roles",
      leagues: "Ligas",
      clubs: "Clubes",
      tournaments: "Torneos",
      players: "Jugadores",
      matches: "Partidos",
      discipline: "Disciplina",
      game: "Juego DT",
      audit: "Auditoria",
      productPriority: "Prioridad de producto",
      firstCore: "Nucleo que debe construirse primero",
      territorialModel: "Modelo territorial",
      territorialModelText: "Ligas, clubes, categorias, torneos y sedes.",
      officialMatch: "Partido oficial",
      officialMatchText: "Fixture, arbitro, eventos, cierre y tablas automaticas.",
      integrity: "Integridad",
      integrityText: "Disciplina, evidencias, resoluciones y auditoria.",
      commercialValue: "Valor comercial",
      commercialValueText: "Scouting, pagos, streaming y sponsors con metricas.",
      permissions: "Permisos",
      roleMatrix: "Matriz inicial de roles",
      functionalMap: "Mapa funcional",
      proModules: "Modulos de la version pro",
      modulesCount: "modulos"
    },
    admin: {
      eyebrow: "Administracion inicial",
      title: "Crear registros desde el panel",
      apiReady: "API lista",
      apiRequired: "API requerida",
      recordType: "Tipo de registro",
      select: "Seleccionar",
      saving: "Guardando registro...",
      created: "creado",
      save: "Guardar",
      entities: {
        leagues: "Liga",
        clubs: "Club",
        tournaments: "Torneo",
        players: "Jugador",
        gameChallenges: "Juego DT"
      },
      fields: {
        name: "Nombre",
        region: "Region",
        season: "Temporada",
        status: "Estado",
        leagueId: "Liga",
        teams: "Equipos",
        players: "Jugadores",
        category: "Categoria",
        format: "Formato",
        clubId: "Club",
        position: "Posicion",
        identityStatus: "Identidad",
        score: "Scoring",
        challengeName: "Nombre del reto",
        mode: "Modo",
        points: "Puntos",
        description: "Descripcion"
      }
    },
    modules: {
      dashboard: "Panel general",
      identity: "Identidad digital",
      competitions: "Ligas y torneos",
      clubs: "Clubes",
      matches: "Partidos",
      referees: "Arbitros",
      discipline: "Disciplina",
      federaltrust: "FederalTrust",
      idaElite: "I.D.A. Elite",
      staff: "DT/PF y capacitacion",
      scouting: "Scouting",
      health: "Salud y soporte",
      payments: "Pagos",
      streaming: "Streaming",
      game: "Juego DT"
    }
  },
  en: {
    languageLabel: "Language",
    spanish: "Spanish",
    english: "English",
    platformName: "PCD Pro",
    platformSubtitle: "Digital Competitions Platform",
    privateAccess: "Private access",
    loginIntro: "Sign in with an authorized account to manage the platform.",
    password: "Password",
    entering: "Signing in...",
    enter: "Enter",
    logout: "Sign out",
    export: "Export",
    publicDemo: "Public demo",
    coverEyebrow: "Territorial sports platform",
    coverCopy:
      "Competitions, digital identity, sports data, Juego DT and institutional management in one professional tool.",
    coverCta: "Enter the platform",
    sidebarSubtitle: "Web + API + mobile app",
    dashboard: {
      heroEyebrow: "Integrated operation",
      heroTitle: "PCD Pro centralizes competition, identity, evidence and sustainability.",
      heroCopy:
        "A foundation ready to turn the functional report into a real platform for leagues, clubs, referees, coaching staffs, professionals, sponsors and players.",
      createTournament: "Create tournament",
      auditMatchday: "Audit matchday",
      backendEyebrow: "Local backend",
      backendTitle: "Initial PCD Pro API",
      connected: "Connected",
      waitingApi: "Waiting for API",
      backendHelp: "Start the backend with",
      backendHelpEnd: "to view data served from",
      users: "Users",
      roles: "Roles",
      leagues: "Leagues",
      clubs: "Clubs",
      tournaments: "Tournaments",
      players: "Players",
      matches: "Matches",
      discipline: "Discipline",
      game: "Juego DT",
      audit: "Audit",
      productPriority: "Product priority",
      firstCore: "Core to build first",
      territorialModel: "Territorial model",
      territorialModelText: "Leagues, clubs, categories, tournaments and venues.",
      officialMatch: "Official match",
      officialMatchText: "Fixture, referee, events, closing and automatic standings.",
      integrity: "Integrity",
      integrityText: "Discipline, evidence, resolutions and audit trail.",
      commercialValue: "Commercial value",
      commercialValueText: "Scouting, payments, streaming and sponsors with metrics.",
      permissions: "Permissions",
      roleMatrix: "Initial role matrix",
      functionalMap: "Functional map",
      proModules: "Pro version modules",
      modulesCount: "modules"
    },
    admin: {
      eyebrow: "Initial administration",
      title: "Create records from the panel",
      apiReady: "API ready",
      apiRequired: "API required",
      recordType: "Record type",
      select: "Select",
      saving: "Saving record...",
      created: "created",
      save: "Save",
      entities: {
        leagues: "League",
        clubs: "Club",
        tournaments: "Tournament",
        players: "Player",
        gameChallenges: "Juego DT"
      },
      fields: {
        name: "Name",
        region: "Region",
        season: "Season",
        status: "Status",
        leagueId: "League",
        teams: "Teams",
        players: "Players",
        category: "Category",
        format: "Format",
        clubId: "Club",
        position: "Position",
        identityStatus: "Identity",
        score: "Scoring",
        challengeName: "Challenge name",
        mode: "Mode",
        points: "Points",
        description: "Description"
      }
    },
    modules: {
      dashboard: "Overview",
      identity: "Digital identity",
      competitions: "Leagues and tournaments",
      clubs: "Clubs",
      matches: "Matches",
      referees: "Referees",
      discipline: "Discipline",
      federaltrust: "FederalTrust",
      idaElite: "I.D.A. Elite",
      staff: "Coaches and training",
      scouting: "Scouting",
      health: "Health and support",
      payments: "Payments",
      streaming: "Streaming",
      game: "Juego DT"
    }
  }
};

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(
    () => window.localStorage.getItem("pcd-language") ?? "es"
  );

  function setLanguage(nextLanguage) {
    if (!dictionaries[nextLanguage]) {
      return;
    }

    window.localStorage.setItem("pcd-language", nextLanguage);
    setLanguageState(nextLanguage);
  }

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: dictionaries[language]
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return context;
}
