export const overviewMetrics = [
  {
    label: "Jugadores",
    value: "128",
    detail: "Perfiles con historial deportivo y ficha unica.",
    status: "Trazables",
    tone: "success"
  },
  {
    label: "Clubes",
    value: "24",
    detail: "Afiliados a ligas, categorias y sedes.",
    status: "Activos",
    tone: "info"
  },
  {
    label: "Partidos",
    value: "36",
    detail: "Resultados, eventos y evidencias cargadas.",
    status: "Oficiales",
    tone: "success"
  },
  {
    label: "Expedientes",
    value: "9",
    detail: "Casos disciplinarios con revision pendiente.",
    status: "Control",
    tone: "warning"
  }
];

export const roleMatrix = [
  { role: "Administrador", scope: "Configura plataforma, auditoria y soporte." },
  { role: "Liga", scope: "Gestiona torneos, reglas, sedes y autoridades." },
  { role: "Club", scope: "Administra planteles, fichajes y staff." },
  { role: "Arbitro", scope: "Carga partido, eventos y parte disciplinario." },
  { role: "Tribunal", scope: "Revisa evidencias y publica resoluciones." },
  { role: "DT/PF/Staff", scope: "Carga entrenamientos, tests y evaluaciones." },
  { role: "Jugador", scope: "Consulta perfil, historial, metricas y desafios." },
  { role: "Profesional", scope: "Registra intervenciones segun permisos." },
  { role: "Scout", scope: "Accede a busquedas autorizadas por consentimiento." }
];

export const modules = [
  {
    id: "dashboard",
    name: "Panel general",
    stage: "Vision ejecutiva",
    priority: "Alta",
    description: "Vista de control para entender estado operativo, deportivo y comercial.",
    outcome: "Direccion integral de la plataforma con indicadores accionables.",
    entities: ["users", "roles", "audit_logs"],
    flows: ["Ver KPIs generales", "Auditar actividad", "Priorizar modulos"]
  },
  {
    id: "federaltrust",
    name: "FederalTrust",
    stage: "Confianza documental",
    priority: "Alta",
    description:
      "Vertical de certificacion digital, trazabilidad legal, pasaporte documental deportivo y contratos federados.",
    outcome:
      "Integra evidencia verificable, hash, QR, cadena de custodia, validacion institucional y certificacion notarial dentro de PCD Pro.",
    entities: [
      "certification_cases",
      "sports_passports",
      "federated_contracts",
      "notaries",
      "audit_events"
    ],
    flows: [
      "Abrir pasaporte documental deportivo",
      "Construir o cargar contratos federados",
      "Validar agente, partes, federacion y escribano",
      "Conservar paquete de evidencia con hash, QR y auditoria"
    ],
    launchPath: "./federaltrust/"
  },
  {
    id: "identity",
    name: "Identidad digital",
    stage: "Seguridad y trazabilidad",
    priority: "Alta",
    description: "Validacion de identidad, biometria opcional y ficha unica por jugador.",
    outcome: "Evita suplantacion, reduce fraude y mantiene historial aunque cambie de club.",
    entities: ["users", "players", "identity_checks", "consents"],
    flows: [
      "Crear perfil unico de jugador",
      "Validar identidad segun reglas de la liga",
      "Gestionar consentimiento para scouts y profesionales"
    ]
  },
  {
    id: "competitions",
    name: "Ligas y torneos",
    stage: "Nucleo deportivo",
    priority: "Alta",
    description: "Estructura formal de ligas, categorias, temporadas, torneos y fixtures.",
    outcome: "Competencias ordenadas con reglas, jornadas, sedes y autoridades definidas.",
    entities: ["leagues", "seasons", "categories", "tournaments", "fixtures"],
    flows: [
      "Crear liga y temporada",
      "Configurar categorias por edad, genero y formato",
      "Generar fixture manual o automatico"
    ]
  },
  {
    id: "clubs",
    name: "Clubes",
    stage: "Operacion territorial",
    priority: "Alta",
    description: "Administracion de clubes, planteles, cuerpos tecnicos, fichajes y sedes.",
    outcome: "Cada club gestiona su operacion sin romper reglas de liga.",
    entities: ["clubs", "teams", "rosters", "staff_members", "venues"],
    flows: [
      "Afiliar club a una liga",
      "Inscribir planteles por categoria",
      "Asignar DT, PF y staff autorizado"
    ]
  },
  {
    id: "matches",
    name: "Partidos",
    stage: "Operacion oficial",
    priority: "Alta",
    description: "Gestion de partidos, estados, resultados, eventos y evidencias multimedia.",
    outcome: "Cada partido se transforma en una fuente oficial de estadisticas y reportes.",
    entities: ["matches", "match_events", "lineups", "media_evidence"],
    flows: [
      "Programar partido con sede y arbitro",
      "Registrar goles, tarjetas, cambios e incidencias",
      "Cerrar resultado oficial y actualizar tablas"
    ]
  },
  {
    id: "referees",
    name: "Arbitros",
    stage: "Tiempo real",
    priority: "Alta",
    description: "Carga en vivo de partido, reportes oficiales y parte disciplinario.",
    outcome: "Reduce errores operativos y acelera la publicacion oficial de resultados.",
    entities: ["referee_assignments", "match_events", "disciplinary_reports"],
    flows: [
      "Ver partidos asignados",
      "Iniciar y cerrar partido",
      "Generar parte disciplinario estandarizado"
    ]
  },
  {
    id: "discipline",
    name: "Disciplina",
    stage: "Integridad institucional",
    priority: "Alta",
    description: "Tribunal, evidencias, resoluciones, sanciones e historial disciplinario.",
    outcome: "Proceso transparente con decisiones trazables y visibilidad controlada.",
    entities: ["disciplinary_cases", "sanctions", "resolutions", "evidence"],
    flows: [
      "Crear expediente desde evento arbitral",
      "Revisar evidencia y contexto",
      "Publicar sancion segun reglamento"
    ]
  },
  {
    id: "staff",
    name: "DT/PF y capacitacion",
    stage: "Desarrollo deportivo",
    priority: "Media",
    description: "Herramientas de evaluacion, medicion, entrenamientos y biblioteca de recursos.",
    outcome: "Mejora la formacion y deja evidencia tecnica verificable por jugador.",
    entities: ["training_plans", "assessments", "test_results", "resources"],
    flows: [
      "Cargar tests fisicos y tecnicos",
      "Subir evidencia audiovisual",
      "Comparar evolucion por periodo"
    ]
  },
  {
    id: "scouting",
    name: "Scouting",
    stage: "Talento",
    priority: "Media",
    description: "Base unica de talento con scoring por dimensiones y busquedas avanzadas.",
    outcome: "Permite detectar talento con datos reales, permisos y consentimiento.",
    entities: ["scouting_reports", "scores", "player_metrics", "video_clips"],
    flows: [
      "Calcular scoring por dimensiones",
      "Filtrar perfiles por edad, posicion y rendimiento",
      "Adjuntar reportes autorizados"
    ]
  },
  {
    id: "health",
    name: "Salud y soporte",
    stage: "Bienestar institucional",
    priority: "Media",
    description: "Aptos fisicos, lesiones, nutricion, salud mental y red profesional.",
    outcome: "Integra cuidado y rendimiento con confidencialidad y permisos adecuados.",
    entities: ["health_records", "injuries", "nutrition_plans", "support_cases"],
    flows: [
      "Registrar apto fisico y vigencia",
      "Hacer seguimiento de lesiones",
      "Derivar a profesionales acreditados"
    ]
  },
  {
    id: "payments",
    name: "Pagos",
    stage: "Sustentabilidad",
    priority: "Media",
    description: "Pagos, liquidaciones, aranceles, entradas y distribucion por convenio.",
    outcome: "Modelo financiero transparente para ligas, clubes, arbitros, sedes y plataforma.",
    entities: ["payments", "invoices", "settlements", "pricing_rules"],
    flows: [
      "Registrar cobro de inscripcion o fichaje",
      "Liquidar por reglas de convenio",
      "Emitir reporte por torneo y temporada"
    ]
  },
  {
    id: "streaming",
    name: "Streaming",
    stage: "Difusion y sponsors",
    priority: "Media",
    description: "Canal oficial de transmisiones, videos, highlights y metricas de consumo.",
    outcome: "Aumenta transparencia, valor comercial y evidencia audiovisual para rendimiento.",
    entities: ["streams", "broadcasts", "clips", "sponsor_assets", "audience_metrics"],
    flows: [
      "Programar transmision por jornada",
      "Publicar highlights y clips tecnicos",
      "Medir visualizaciones, alcance e interaccion"
    ]
  },
  {
    id: "game",
    name: "Juego DT",
    stage: "Engagement deportivo",
    priority: "Media",
    description: "Modulo digital y fisico de desafios, rankings, simulacion tactica y comunidad.",
    outcome: "Potencia adopcion, retencion, sponsors y experiencias competitivas complementarias.",
    entities: ["game_challenges", "rankings", "game_events", "sponsor_rewards"],
    flows: [
      "Crear retos tecnicos, fisicos, tacticos o cognitivos",
      "Asignar desafios por categoria",
      "Generar rankings y experiencias presenciales"
    ]
  }
];
