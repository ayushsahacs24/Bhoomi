import { useEffect, useState } from "react";
import { MapPin, Layers, ZoomIn, ZoomOut } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";
import { calculateNDVI } from "../services/weatherService";

export function SatelliteMap() {
  const { t } = useLanguage();
  const { location, locationName } = useLocation();
  const [ndvi, setNdvi] = useState<number>(0);
  const [zoom, setZoom] = useState(13);
  const [showNDVI, setShowNDVI] = useState(true);

  useEffect(() => {
    if (location) {
      const ndviValue = calculateNDVI(location);
      setNdvi(ndviValue);
    }
  }, [location]);

  if (!location) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">Detecting location...</p>
      </div>
    );
  }

  const getNDVIColor = (value: number) => {
    if (value > 0.6) return "#22c55e"; // green
    if (value > 0.3) return "#eab308"; // yellow
    return "#ef4444"; // red
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-xl font-bold text-gray-800">{t("map")}</h1>
          <button
            onClick={() => setShowNDVI(!showNDVI)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              showNDVI ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            <Layers className="size-4 mr-2" />
            NDVI Layer
          </button>
        </div>
        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="size-4 mr-1" />
          <span>{locationName || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-gradient-to-br from-green-100 via-green-200 to-green-300">
        {/* Simulated Map Tiles */}
        <div className="absolute inset-0">
          <div className="w-full h-full relative overflow-hidden">
            {/* Base Map Pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Farm Location Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* NDVI Visualization Circle */}
                {showNDVI && (
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
                    style={{
                      width: "200px",
                      height: "200px",
                      backgroundColor: getNDVIColor(ndvi),
                    }}
                  />
                )}
                
                {/* Location Pin */}
                <div className="relative z-10">
                  <div className="bg-red-500 rounded-full p-3 shadow-lg border-4 border-white">
                    <MapPin className="size-8 text-white fill-white" />
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white px-3 py-2 rounded-lg shadow-md whitespace-nowrap">
                    <p className="font-semibold text-sm">Your Farm</p>
                    <p className="text-xs text-gray-600">NDVI: {ndvi.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* NDVI Legend */}
            {showNDVI && (
              <div className="absolute bottom-20 left-4 bg-white rounded-xl shadow-lg p-4">
                <h3 className="font-semibold text-sm mb-3">NDVI Scale</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded mr-2" />
                    <span className="text-xs">0.6 - 1.0 Healthy</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-yellow-500 rounded mr-2" />
                    <span className="text-xs">0.3 - 0.6 Moderate</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-500 rounded mr-2" />
                    <span className="text-xs">0.0 - 0.3 Critical</span>
                  </div>
                </div>
              </div>
            )}

            {/* Zoom Controls */}
            <div className="absolute bottom-20 right-4 flex flex-col gap-2">
              <button
                onClick={() => setZoom(Math.min(18, zoom + 1))}
                className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ZoomIn className="size-6 text-gray-700" />
              </button>
              <button
                onClick={() => setZoom(Math.max(10, zoom - 1))}
                className="bg-white p-3 rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ZoomOut className="size-6 text-gray-700" />
              </button>
            </div>

            {/* Zoom Level Display */}
            <div className="absolute top-4 right-4 bg-white px-3 py-2 rounded-lg shadow-md">
              <span className="text-sm font-medium">Zoom: {zoom}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="bg-white border-t border-gray-200 p-4">
        <p className="text-xs text-gray-500 text-center">
          Mock satellite visualization. Integrate Sentinel Hub or Landsat API for real data.
        </p>
      </div>
    </div>
  );
}
