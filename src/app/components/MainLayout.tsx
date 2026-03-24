import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Map, TrendingUp, Bell, User } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const navItems = [
    { path: "/app", icon: Home, label: t("dashboard") },
    { path: "/app/map", icon: Map, label: t("map") },
    { path: "/app/insights", icon: TrendingUp, label: t("insights") },
    { path: "/app/alerts", icon: Bell, label: t("alerts") },
    { path: "/app/profile", icon: User, label: t("profile") },
  ];

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-screen-xl mx-auto flex justify-around items-center h-20 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active ? "text-green-600" : "text-gray-500"
                }`}
              >
                <Icon className={`size-6 mb-1 ${active ? "fill-green-600" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
