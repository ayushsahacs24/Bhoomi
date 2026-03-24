// Utility functions for formatting data in the app

export function formatTemperature(temp: number): string {
  return `${temp}°C`;
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function formatNDVI(ndvi: number): string {
  return ndvi.toFixed(2);
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDateTime(date: Date): string {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function getHealthColor(value: number, type: "ndvi" | "moisture"): string {
  if (type === "ndvi") {
    if (value > 0.6) return "green";
    if (value > 0.3) return "yellow";
    return "red";
  } else {
    // moisture
    if (value > 60) return "green";
    if (value > 30) return "yellow";
    return "red";
  }
}

export function getHealthLabel(value: number, type: "ndvi" | "moisture"): string {
  const color = getHealthColor(value, type);
  switch (color) {
    case "green":
      return "Healthy";
    case "yellow":
      return "Moderate";
    case "red":
      return "Critical";
    default:
      return "Unknown";
  }
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
