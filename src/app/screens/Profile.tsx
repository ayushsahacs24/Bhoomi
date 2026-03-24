import { useState } from "react";
import { User, MapPin, Ruler, Sprout, Languages, Moon, Sun, LogOut } from "lucide-react";
import { useNavigate } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "../context/LocationContext";

export function Profile() {
  const { t, language, setLanguage } = useLanguage();
  const { locationName, detectLocation } = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [farmerName, setFarmerName] = useState("Rajesh Kumar");
  const [landSize, setLandSize] = useState("2.5 acres");
  const [cropType, setCropType] = useState("Rice");
  const [isEditing, setIsEditing] = useState(false);

  const cropOptions = ["Rice", "Wheat", "Cotton", "Sugarcane", "Maize", "Vegetables"];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 pb-12">
        <h1 className="text-2xl font-bold mb-2">{t("profile")}</h1>
        <p className="text-green-100 text-sm">Manage your account and preferences</p>
      </div>

      <div className="px-6 -mt-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center mb-6">
            <div className="bg-green-100 rounded-full p-6 mr-4">
              <User className="size-12 text-green-600" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="text-xl font-bold text-gray-800 border-b-2 border-green-600 focus:outline-none w-full"
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-800">{farmerName}</h2>
              )}
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <MapPin className="size-4 mr-1" />
                <span>{locationName || "Location not set"}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>

        {/* Farm Details */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Farm Details</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Ruler className="size-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t("landSize")}</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={landSize}
                      onChange={(e) => setLandSize(e.target.value)}
                      className="font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-green-600"
                    />
                  ) : (
                    <p className="font-semibold text-gray-800">{landSize}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center flex-1">
                <Sprout className="size-5 text-green-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{t("cropType")}</p>
                  {isEditing ? (
                    <select
                      value={cropType}
                      onChange={(e) => setCropType(e.target.value)}
                      className="font-semibold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-green-600 bg-transparent"
                    >
                      {cropOptions.map((crop) => (
                        <option key={crop} value={crop}>
                          {crop}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-semibold text-gray-800">{cropType}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MapPin className="size-5 text-orange-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t("location")}</p>
                  <p className="font-semibold text-gray-800">{locationName || "Not detected"}</p>
                </div>
              </div>
              <button
                onClick={detectLocation}
                className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
              >
                Detect
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Languages className="size-5 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-600">{t("selectLanguage")}</p>
                  <p className="font-semibold text-gray-800">
                    {language === "en" ? "English" : language === "hi" ? "हिंदी" : "ಕನ್ನಡ"}
                  </p>
                </div>
              </div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "hi" | "kn")}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-600"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="kn">ಕನ್ನಡ</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                {darkMode ? (
                  <Moon className="size-5 text-indigo-600 mr-3" />
                ) : (
                  <Sun className="size-5 text-yellow-600 mr-3" />
                )}
                <div>
                  <p className="text-sm text-gray-600">Dark Mode</p>
                  <p className="font-semibold text-gray-800">{darkMode ? "Enabled" : "Disabled"}</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  darkMode ? "bg-green-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    darkMode ? "transform translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">About AgroPulse</h3>
          <p className="text-sm text-gray-600 mb-3">
            Version 1.0.0
          </p>
          <p className="text-sm text-gray-600">
            AgroPulse provides satellite-based agricultural insights to help farmers make informed
            decisions about irrigation, crop health, and resource management.
          </p>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-4 rounded-xl transition-colors flex items-center justify-center mb-6"
        >
          <LogOut className="size-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
}
