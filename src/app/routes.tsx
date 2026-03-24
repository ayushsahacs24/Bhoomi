import { createBrowserRouter } from "react-router";
import { Login } from "./screens/Login";
import { LanguageSelection } from "./screens/LanguageSelection";
import { Dashboard } from "./screens/Dashboard";
import { SatelliteMap } from "./screens/SatelliteMap";
import { Insights } from "./screens/Insights";
import { Alerts } from "./screens/Alerts";
import { Profile } from "./screens/Profile";
import { NotFound } from "./screens/NotFound";
import { MainLayout } from "./components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/language",
    Component: LanguageSelection,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "map", Component: SatelliteMap },
      { path: "insights", Component: Insights },
      { path: "alerts", Component: Alerts },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);