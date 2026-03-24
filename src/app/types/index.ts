// Shared types for AgroPulse application

export interface Location {
  lat: number;
  lng: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  description: string;
  windSpeed: number;
  pressure: number;
  feelsLike: number;
}

export interface FarmData {
  farmerName: string;
  landSize: string;
  cropType: string;
  location: Location;
  locationName: string;
}

export interface CropHealthData {
  ndvi: number;
  soilMoisture: number;
  groundwaterLevel: string;
  lastUpdated: Date;
}

export interface Alert {
  id: string;
  type: "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: Date;
}

export type Language = "en" | "hi" | "kn";

export type HealthStatus = "healthy" | "moderate" | "critical";
