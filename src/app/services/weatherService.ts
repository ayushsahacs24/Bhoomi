// OpenWeatherMap API Service
// To use real data, replace YOUR_API_KEY_HERE with your actual API key from https://openweathermap.org/api
//
// Steps to get API key:
// 1. Visit https://openweathermap.org/api
// 2. Sign up for a free account
// 3. Navigate to API keys section
// 4. Copy your API key
// 5. Replace YOUR_API_KEY_HERE below with your actual key

const API_KEY = "YOUR_API_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  description: string;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
}

export async function fetchWeatherData(lat: number, lng: number): Promise<WeatherData> {
  try {
    // If no API key, return mock data
    if (API_KEY === "YOUR_API_KEY_HERE") {
      return getMockWeatherData();
    }

    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Weather API request failed");
    }

    const data = await response.json();

    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      rainfall: data.rain?.["1h"] || 0,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      feelsLike: Math.round(data.main.feels_like),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return getMockWeatherData();
  }
}

function getMockWeatherData(): WeatherData {
  const hour = new Date().getHours();
  const isDay = hour >= 6 && hour < 18;
  
  return {
    temperature: isDay ? 32 : 24,
    humidity: 65,
    rainfall: 0,
    description: isDay ? "partly cloudy" : "clear sky",
    windSpeed: 12,
    pressure: 1013,
    feelsLike: isDay ? 35 : 26,
  };
}

// Calculate NDVI based on mock satellite data
export function calculateNDVI(location: { lat: number; lng: number }): number {
  // Mock NDVI calculation (0 to 1 scale)
  // Higher values = healthier vegetation
  const baseNDVI = 0.6 + (Math.sin(location.lat) * 0.2);
  const randomVariation = (Math.random() * 0.2) - 0.1;
  return Math.max(0, Math.min(1, baseNDVI + randomVariation));
}

// Estimate soil moisture based on NDVI and weather
export function estimateSoilMoisture(ndvi: number, weather: WeatherData): number {
  // Mock calculation: 0-100%
  const baseFromNDVI = ndvi * 50;
  const humidityFactor = weather.humidity * 0.3;
  const rainfallFactor = weather.rainfall * 5;
  
  return Math.max(0, Math.min(100, Math.round(baseFromNDVI + humidityFactor + rainfallFactor)));
}

// Estimate groundwater level
export function estimateGroundwaterLevel(soilMoisture: number): string {
  if (soilMoisture > 70) return "High";
  if (soilMoisture > 40) return "Moderate";
  return "Low";
}

// Irrigation recommendation logic
export function getIrrigationRecommendation(
  soilMoisture: number,
  temperature: number
): { needed: boolean; message: string } {
  const moistureThreshold = 40;
  const tempThreshold = 30;

  if (soilMoisture < moistureThreshold && temperature > tempThreshold) {
    return {
      needed: true,
      message: "Irrigation strongly recommended. Soil moisture is low and temperature is high.",
    };
  } else if (soilMoisture < moistureThreshold) {
    return {
      needed: true,
      message: "Irrigation recommended. Soil moisture is below optimal level.",
    };
  } else {
    return {
      needed: false,
      message: "No irrigation needed. Soil moisture is adequate.",
    };
  }
}

// Weather alerts
export interface WeatherAlert {
  id: string;
  type: "warning" | "info";
  title: string;
  message: string;
  timestamp: Date;
}

export function generateWeatherAlerts(weather: WeatherData): WeatherAlert[] {
  const alerts: WeatherAlert[] = [];

  if (weather.temperature > 35) {
    alerts.push({
      id: "heat-1",
      type: "warning",
      title: "High Temperature Alert",
      message: `Temperature is ${weather.temperature}°C. Ensure adequate irrigation and shade for crops.`,
      timestamp: new Date(),
    });
  }

  if (weather.humidity < 30) {
    alerts.push({
      id: "humidity-1",
      type: "info",
      title: "Low Humidity",
      message: "Low humidity detected. Monitor crop water requirements closely.",
      timestamp: new Date(),
    });
  }

  if (weather.rainfall > 10) {
    alerts.push({
      id: "rain-1",
      type: "info",
      title: "Rainfall Detected",
      message: `${weather.rainfall}mm of rain recorded. Adjust irrigation schedule accordingly.`,
      timestamp: new Date(),
    });
  }

  return alerts;
}