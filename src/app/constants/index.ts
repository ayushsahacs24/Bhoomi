// Application constants

export const APP_NAME = "AgroPulse";
export const APP_VERSION = "1.0.0";

// Thresholds
export const SOIL_MOISTURE_THRESHOLD = 40; // Below this requires irrigation
export const TEMPERATURE_THRESHOLD = 30; // Above this with low moisture needs urgent irrigation
export const NDVI_HEALTHY = 0.6;
export const NDVI_MODERATE = 0.3;
export const MOISTURE_HEALTHY = 60;
export const MOISTURE_MODERATE = 30;

// Crop options
export const CROP_TYPES = [
  "Rice",
  "Wheat",
  "Cotton",
  "Sugarcane",
  "Maize",
  "Soybean",
  "Pulses",
  "Vegetables",
  "Fruits",
  "Other",
];

// Language options
export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
] as const;

// Default location (Bangalore, India)
export const DEFAULT_LOCATION = {
  lat: 12.9716,
  lng: 77.5946,
  name: "Bangalore, Karnataka",
};

// API endpoints (placeholders)
export const API_ENDPOINTS = {
  WEATHER: "https://api.openweathermap.org/data/2.5/weather",
  FORECAST: "https://api.openweathermap.org/data/2.5/forecast",
  // Add satellite API endpoints here when ready
  SENTINEL: "https://services.sentinel-hub.com/ogc/wms",
};

// Refresh intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  WEATHER: 10 * 60 * 1000, // 10 minutes
  SATELLITE: 60 * 60 * 1000, // 1 hour
  LOCATION: 5 * 60 * 1000, // 5 minutes
};

// Chart colors
export const CHART_COLORS = {
  temperature: "#f97316", // orange
  humidity: "#3b82f6", // blue
  ndvi: "#22c55e", // green
  soilMoisture: "#06b6d4", // cyan
};

// Status colors
export const STATUS_COLORS = {
  healthy: "bg-green-500",
  moderate: "bg-yellow-500",
  critical: "bg-red-500",
};

export const STATUS_TEXT_COLORS = {
  healthy: "text-green-700",
  moderate: "text-yellow-700",
  critical: "text-red-700",
};

// Storage keys for local data
export const STORAGE_KEYS = {
  LANGUAGE: "agropulse_language",
  FARMER_DATA: "agropulse_farmer_data",
  LAST_LOCATION: "agropulse_last_location",
  CACHED_WEATHER: "agropulse_cached_weather",
  THEME: "agropulse_theme",
};
