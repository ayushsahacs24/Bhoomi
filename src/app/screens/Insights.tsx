import { useEffect, useState } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, Thermometer, Droplets, Activity } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import { fetchWeatherData, calculateNDVI, estimateSoilMoisture, WeatherData } from "../services/weatherService";

export function Insights() {
  const { t } = useLanguage();
  const { location } = useLocation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [ndvi, setNdvi] = useState<number>(0);
  const [soilMoisture, setSoilMoisture] = useState<number>(0);

  useEffect(() => {
    if (location) {
      fetchWeatherData(location.lat, location.lng).then((data) => {
        setWeather(data);
        const ndviValue = calculateNDVI(location);
        setNdvi(ndviValue);
        setSoilMoisture(estimateSoilMoisture(ndviValue, data));
      });
    }
  }, [location]);

  // Generate mock historical data
  const generateHistoricalData = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day, index) => ({
      day,
      temperature: weather ? weather.temperature + (Math.random() * 6 - 3) : 30,
      humidity: weather ? weather.humidity + (Math.random() * 20 - 10) : 60,
      ndvi: ndvi + (Math.random() * 0.2 - 0.1),
      soilMoisture: soilMoisture + (Math.random() * 20 - 10),
    }));
  };

  const historicalData = weather ? generateHistoricalData() : [];

  if (!weather) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Loading insights...</p>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">{t("insights")}</h1>
        <p className="text-green-100 text-sm">7-day trend analysis</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Current Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center mb-2">
              <Activity className="size-5 text-green-600 mr-2" />
              <span className="text-sm text-gray-600">NDVI</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{ndvi.toFixed(2)}</div>
            <div className="text-xs text-gray-500 mt-1">Vegetation Index</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center mb-2">
              <Thermometer className="size-5 text-orange-600 mr-2" />
              <span className="text-sm text-gray-600">{t("temperature")}</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{weather.temperature}°C</div>
            <div className="text-xs text-gray-500 mt-1">Feels like {weather.feelsLike}°C</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center mb-2">
              <Droplets className="size-5 text-blue-600 mr-2" />
              <span className="text-sm text-gray-600">{t("humidity")}</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{weather.humidity}%</div>
            <div className="text-xs text-gray-500 mt-1">Relative humidity</div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4">
            <div className="flex items-center mb-2">
              <Droplets className="size-5 text-cyan-600 mr-2" />
              <span className="text-sm text-gray-600">{t("soilMoisture")}</span>
            </div>
            <div className="text-3xl font-bold text-gray-800">{soilMoisture}%</div>
            <div className="text-xs text-gray-500 mt-1">Estimated</div>
          </div>
        </div>

        {/* Temperature & Humidity Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="size-5 mr-2 text-orange-600" />
            Temperature & Humidity Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: "#f97316", r: 4 }}
                name="Temp (°C)"
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                name="Humidity (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* NDVI Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Activity className="size-5 mr-2 text-green-600" />
            Crop Health (NDVI) Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} domain={[0, 1]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="ndvi" fill="#22c55e" radius={[8, 8, 0, 0]} name="NDVI" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Soil Moisture Trend */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
            <Droplets className="size-5 mr-2 text-cyan-600" />
            Soil Moisture Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#888" fontSize={12} />
              <YAxis stroke="#888" fontSize={12} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="soilMoisture"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ fill: "#06b6d4", r: 5 }}
                name="Moisture (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Additional Insights */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">Key Insights</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Current NDVI of {ndvi.toFixed(2)} indicates{" "}
                {ndvi > 0.6 ? "healthy" : ndvi > 0.3 ? "moderate" : "stressed"} vegetation
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Soil moisture at {soilMoisture}% is{" "}
                {soilMoisture > 60 ? "adequate" : soilMoisture > 30 ? "moderate" : "low"}
              </span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>
                Temperature trends show {weather.temperature > 32 ? "hot" : "normal"} conditions
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
