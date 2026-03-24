import { X, Info } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-green-600 text-white p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center">
            <Info className="size-6 mr-3" />
            <h2 className="text-xl font-bold">Quick Help</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-green-700 rounded-lg transition-colors">
            <X className="size-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* NDVI Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Understanding NDVI</h3>
            <p className="text-sm text-gray-600 mb-3">
              NDVI (Vegetation Index) measures crop health from satellite images.
            </p>
            <div className="space-y-2">
              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <div className="w-6 h-6 bg-green-500 rounded mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-800">0.6 - 1.0 Healthy</p>
                  <p className="text-xs text-gray-600">Excellent vegetation</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                <div className="w-6 h-6 bg-yellow-500 rounded mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-800">0.3 - 0.6 Moderate</p>
                  <p className="text-xs text-gray-600">Monitor closely</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-red-50 rounded-lg">
                <div className="w-6 h-6 bg-red-500 rounded mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-800">0.0 - 0.3 Critical</p>
                  <p className="text-xs text-gray-600">Immediate attention needed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Soil Moisture */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Soil Moisture Levels</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">&gt; 60%</span>
                <span className="text-sm font-medium text-green-600">Adequate</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">30-60%</span>
                <span className="text-sm font-medium text-yellow-600">Moderate</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">&lt; 30%</span>
                <span className="text-sm font-medium text-red-600">Low - Irrigate</span>
              </div>
            </div>
          </div>

          {/* Irrigation Logic */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Irrigation Recommendation</h3>
            <p className="text-sm text-blue-800">
              Based on soil moisture and temperature data, the app recommends irrigation when:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-800">
              <li>• Soil moisture &lt; 40%</li>
              <li>• Temperature &gt; 30°C</li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Navigation</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>🏠 <strong>Dashboard:</strong> View current conditions</p>
              <p>🗺️ <strong>Map:</strong> Visualize your farm with NDVI overlay</p>
              <p>📊 <strong>Insights:</strong> See 7-day trends and charts</p>
              <p>🔔 <strong>Alerts:</strong> Check weather warnings</p>
              <p>👤 <strong>Profile:</strong> Manage your settings</p>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Tips</h3>
            <ul className="space-y-1 text-sm text-green-800">
              <li>• Refresh data regularly using the refresh icon</li>
              <li>• Enable location for accurate weather data</li>
              <li>• Check alerts daily for weather updates</li>
              <li>• Monitor trends in the Insights screen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
