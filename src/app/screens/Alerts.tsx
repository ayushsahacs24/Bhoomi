import { useEffect, useState } from "react";
import { Bell, AlertTriangle, Info, Cloud, Droplets, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import { fetchWeatherData, generateWeatherAlerts, WeatherAlert } from "../services/weatherService";

export function Alerts() {
  const { t } = useLanguage();
  const { location } = useLocation();
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location) {
      setLoading(true);
      fetchWeatherData(location.lat, location.lng).then((weather) => {
        const weatherAlerts = generateWeatherAlerts(weather);
        setAlerts(weatherAlerts);
        setLoading(false);
      });
    }
  }, [location]);

  const getAlertIcon = (type: string) => {
    if (type === "warning") {
      return <AlertTriangle className="size-6 text-orange-600" />;
    }
    return <Info className="size-6 text-blue-600" />;
  };

  const getAlertColor = (type: string) => {
    if (type === "warning") {
      return "bg-orange-50 border-orange-300";
    }
    return "bg-blue-50 border-blue-300";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Loading alerts...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white p-6">
        <div className="flex items-center">
          <Bell className="size-8 mr-3" />
          <div>
            <h1 className="text-2xl font-bold mb-1">{t("alerts")}</h1>
            <p className="text-orange-100 text-sm">{t("weatherAlerts")}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {alerts.length === 0 ? (
          /* No Alerts */
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
              <Bell className="size-12 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">All Clear!</h3>
            <p className="text-gray-600">{t("noAlerts")}</p>
          </div>
        ) : (
          /* Alerts List */
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-xl shadow-md p-5 border-2 ${getAlertColor(alert.type)}`}
              >
                <div className="flex items-start">
                  <div className="mr-4 mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-2">{alert.title}</h3>
                    <p className="text-sm text-gray-700 mb-3">{alert.message}</p>
                    <p className="text-xs text-gray-500">
                      {alert.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upcoming Weather Advisory */}
        <div className="mt-6 bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Cloud className="size-5 mr-2 text-gray-600" />
            Weather Advisory
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <Sun className="size-8 text-yellow-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Today</p>
                  <p className="text-sm text-gray-600">Partly cloudy</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">32°C</p>
                <p className="text-xs text-gray-600">High: 35°C</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Droplets className="size-8 text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Tomorrow</p>
                  <p className="text-sm text-gray-600">Light rain expected</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">28°C</p>
                <p className="text-xs text-gray-600">Rain: 5mm</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-300">
          <h3 className="font-semibold text-green-900 mb-3">Recommendations</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Monitor soil moisture levels regularly during hot weather</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Check irrigation systems before dry periods</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Prepare drainage for potential rainfall</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
