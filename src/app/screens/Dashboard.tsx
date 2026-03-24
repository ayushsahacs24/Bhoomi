import { useEffect, useState } from "react";
import { MapPin, Droplets, Thermometer, Cloud, Sprout, Activity, RefreshCw, HelpCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import { HelpModal } from "../components/HelpModal";
import {
  fetchWeatherData,
  calculateNDVI,
  estimateSoilMoisture,
  estimateGroundwaterLevel,
  getIrrigationRecommendation,
  WeatherData,
} from "../services/weatherService";

export function Dashboard() {
  const { t } = useLanguage();
  const { location, locationName } = useLocation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [ndvi, setNdvi] = useState<number>(0);
  const [soilMoisture, setSoilMoisture] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [showHelp, setShowHelp] = useState(false);

  const loadData = async () => {
    if (!location) return;
    
    setLoading(true);
    const weatherData = await fetchWeatherData(location.lat, location.lng);
    const ndviValue = calculateNDVI(location);
    const soilMoistureValue = estimateSoilMoisture(ndviValue, weatherData);

    setWeather(weatherData);
    setNdvi(ndviValue);
    setSoilMoisture(soilMoistureValue);
    setLastUpdated(new Date());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [location]);

  if (loading || !weather) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <RefreshCw className="size-12 text-green-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading data...</p>
        </div>
      </div>
    );
  }

  const groundwaterLevel = estimateGroundwaterLevel(soilMoisture);
  const irrigationRec = getIrrigationRecommendation(soilMoisture, weather.temperature);

  const getHealthStatus = (value: number, type: "ndvi" | "moisture") => {
    if (type === "ndvi") {
      if (value > 0.6) return { color: "bg-green-500", text: t("healthy") };
      if (value > 0.3) return { color: "bg-yellow-500", text: t("moderate") };
      return { color: "bg-red-500", text: t("critical") };
    } else {
      if (value > 60) return { color: "bg-green-500", text: t("healthy") };
      if (value > 30) return { color: "bg-yellow-500", text: t("moderate") };
      return { color: "bg-red-500", text: t("critical") };
    }
  };

  const cropHealthStatus = getHealthStatus(ndvi, "ndvi");
  const moistureStatus = getHealthStatus(soilMoisture, "moisture");

  return (
    <div className="min-h-full bg-gradient-to-b from-green-50 to-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 pb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">AgroPulse</h1>
            <div className="flex items-center text-green-100">
              <MapPin className="size-4 mr-1" />
              <span className="text-sm">{locationName || "Detecting location..."}</span>
            </div>
          </div>
          <button
            onClick={loadData}
            className="p-2 bg-green-700 rounded-full hover:bg-green-800 transition-colors"
          >
            <RefreshCw className="size-5" />
          </button>
        </div>

        {/* Weather Summary */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-green-700 rounded-xl p-4 text-center">
            <Thermometer className="size-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{weather.temperature}°C</div>
            <div className="text-xs text-green-200">{t("temperature")}</div>
          </div>
          <div className="bg-green-700 rounded-xl p-4 text-center">
            <Droplets className="size-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{weather.humidity}%</div>
            <div className="text-xs text-green-200">{t("humidity")}</div>
          </div>
          <div className="bg-green-700 rounded-xl p-4 text-center">
            <Cloud className="size-6 mx-auto mb-2" />
            <div className="text-2xl font-bold">{weather.rainfall}mm</div>
            <div className="text-xs text-green-200">{t("rainfall")}</div>
          </div>
        </div>
      </div>

      {/* Main Cards */}
      <div className="p-6 space-y-4">
        {/* Crop Health Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-xl mr-3">
                <Sprout className="size-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{t("cropHealth")}</h3>
                <p className="text-sm text-gray-500">NDVI: {ndvi.toFixed(2)}</p>
              </div>
            </div>
            <div className={`${cropHealthStatus.color} text-white px-4 py-2 rounded-full text-sm font-medium`}>
              {cropHealthStatus.text}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`${cropHealthStatus.color} h-3 rounded-full transition-all`}
              style={{ width: `${ndvi * 100}%` }}
            />
          </div>
        </div>

        {/* Soil Moisture Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-xl mr-3">
                <Droplets className="size-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{t("soilMoisture")}</h3>
                <p className="text-sm text-gray-500">{soilMoisture}%</p>
              </div>
            </div>
            <div className={`${moistureStatus.color} text-white px-4 py-2 rounded-full text-sm font-medium`}>
              {moistureStatus.text}
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`${moistureStatus.color} h-3 rounded-full transition-all`}
              style={{ width: `${soilMoisture}%` }}
            />
          </div>
        </div>

        {/* Irrigation Suggestion Card */}
        <div className={`rounded-2xl shadow-md p-6 ${irrigationRec.needed ? "bg-orange-50 border-2 border-orange-300" : "bg-green-50 border-2 border-green-300"}`}>
          <div className="flex items-start">
            <div className={`${irrigationRec.needed ? "bg-orange-100" : "bg-green-100"} p-3 rounded-xl mr-3`}>
              <Activity className={`size-6 ${irrigationRec.needed ? "text-orange-600" : "text-green-600"}`} />
            </div>
            <div className="flex-1">
              <h3 className={`font-semibold mb-2 ${irrigationRec.needed ? "text-orange-800" : "text-green-800"}`}>
                {irrigationRec.needed ? t("irrigationNeeded") : t("noIrrigationNeeded")}
              </h3>
              <p className="text-sm text-gray-700">{irrigationRec.message}</p>
            </div>
          </div>
        </div>

        {/* Groundwater Level Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-cyan-100 p-3 rounded-xl mr-3">
                <Droplets className="size-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{t("groundwater")}</h3>
                <p className="text-sm text-gray-500">Estimated</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-cyan-600">{groundwaterLevel}</div>
          </div>
        </div>

        {/* Last Updated */}
        <p className="text-center text-sm text-gray-500">
          {t("lastUpdated")}: {lastUpdated.toLocaleTimeString()}
        </p>
      </div>

      {/* Help Button */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-24 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-10"
      >
        <HelpCircle className="size-6" />
      </button>

      {/* Help Modal */}
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </div>
  );
}