import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Banknote,
  Brain,
  ChartNoAxesCombined,
  ClipboardCheck,
  Dumbbell,
  Fingerprint,
  Gavel,
  Gamepad2,
  HeartPulse,
  LifeBuoy,
  Radio,
  ScrollText,
  ShieldCheck,
  Trophy,
  UsersRound
} from "lucide-react";
import { modules, overviewMetrics, roleMatrix } from "../../shared/data/platformData.js";
import { fetchBootstrap, IS_DEMO_MODE } from "../../shared/api/client.js";
import { LoginView } from "../auth/LoginView.jsx";
import { CoverView } from "../cover/CoverView.jsx";
import { DashboardView } from "../dashboard/DashboardView.jsx";
import { FederalTrustView } from "../federaltrust/FederalTrustView.jsx";
import { HealthView } from "../health/HealthView.jsx";
import { IdaEliteView } from "../idaElite/IdaEliteView.jsx";
import { RecurseroView } from "../recursero/RecurseroView.jsx";
import { GameView } from "../game/GameView.jsx";
import { ModuleView } from "../modules/ModuleView.jsx";
import { Sidebar } from "../../shared/ui/Sidebar.jsx";
import { Topbar } from "../../shared/ui/Topbar.jsx";

const iconMap = {
  dashboard: ChartNoAxesCombined,
  identity: Fingerprint,
  competitions: Trophy,
  clubs: ShieldCheck,
  matches: Activity,
  referees: ClipboardCheck,
  discipline: Gavel,
  federaltrust: ScrollText,
  idaElite: Brain,
  staff: Dumbbell,
  scouting: UsersRound,
  health: HeartPulse,
  recursero: LifeBuoy,
  payments: Banknote,
  streaming: Radio,
  game: Gamepad2
};

export function App() {
  const [hasEnteredCover, setHasEnteredCover] = useState(
    () => window.sessionStorage.getItem("pcd-cover-entered") === "true"
  );
  const [activeModuleId, setActiveModuleId] = useState("dashboard");
  const [session, setSession] = useState(() => {
    if (IS_DEMO_MODE) {
      return {
        token: "demo-token",
        user: {
          name: "Visitante Demo",
          email: "demo@pcd.pro",
          role: "Demo publica"
        }
      };
    }

    const stored = window.localStorage.getItem("pcd-session");
    return stored ? JSON.parse(stored) : null;
  });
  const [apiState, setApiState] = useState({
    status: "loading",
    data: null,
    error: null
  });

  const navigation = useMemo(
    () =>
      modules.map((module) => ({
        ...module,
        Icon: iconMap[module.id] ?? ChartNoAxesCombined
      })),
    []
  );

  const activeModule = modules.find((module) => module.id === activeModuleId) ?? modules[0];

  function refreshApiState() {
    setApiState((current) => ({ ...current, status: current.data ? "refreshing" : "loading" }));

    return fetchBootstrap(session?.token)
      .then((data) => {
        setApiState({ status: "connected", data, error: null });
        return data;
      })
      .catch((error) => {
        setApiState({ status: "offline", data: null, error: error.message });
        throw error;
      });
  }

  useEffect(() => {
    if (session?.token) {
      refreshApiState().catch(() => {});
    }
  }, [session?.token]);

  function handleLogin(nextSession) {
    window.localStorage.setItem("pcd-session", JSON.stringify(nextSession));
    setSession(nextSession);
  }

  function handleLogout() {
    if (IS_DEMO_MODE) {
      window.sessionStorage.removeItem("pcd-cover-entered");
      setHasEnteredCover(false);
      return;
    }

    window.localStorage.removeItem("pcd-session");
    setSession(null);
    setApiState({ status: "loading", data: null, error: null });
  }

  function handleEnterCover() {
    window.sessionStorage.setItem("pcd-cover-entered", "true");
    setHasEnteredCover(true);
  }

  if (!hasEnteredCover) {
    return <CoverView onEnter={handleEnterCover} />;
  }

  if (!session) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="shell">
      <Sidebar
        activeModuleId={activeModuleId}
        navigation={navigation}
        onSelectModule={setActiveModuleId}
      />
      <main className="workspace">
        <Topbar activeModule={activeModule} session={session} onLogout={handleLogout} />
        {activeModuleId === "dashboard" ? (
          <DashboardView
            apiState={apiState}
            metrics={overviewMetrics}
            roleMatrix={roleMatrix}
            modules={modules}
            onRefreshApi={refreshApiState}
            token={session.token}
          />
        ) : activeModuleId === "federaltrust" ? (
          <FederalTrustView />
        ) : activeModuleId === "idaElite" ? (
          <IdaEliteView />
        ) : activeModuleId === "recursero" ? (
          <RecurseroView />
        ) : activeModuleId === "health" ? (
          <HealthView />
        ) : activeModuleId === "game" ? (
          <GameView />
        ) : (
          <ModuleView module={activeModule} />
        )}
      </main>
    </div>
  );
}
