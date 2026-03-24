import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi" | "kn";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    kn: string;
  };
}

const translations: Translations = {
  welcome: { en: "Welcome to AgroPulse", hi: "AgroPulse में आपका स्वागत है", kn: "AgroPulse ಗೆ ಸ್ವಾಗತ" },
  login: { en: "Login", hi: "लॉगिन करें", kn: "ಲಾಗಿನ್" },
  phoneNumber: { en: "Phone Number", hi: "फ़ोन नंबर", kn: "ಫೋನ್ ಸಂಖ್ಯೆ" },
  selectLanguage: { en: "Select Language", hi: "भाषा चुनें", kn: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ" },
  english: { en: "English", hi: "अंग्रेज़ी", kn: "ಇಂಗ್ಲಿಷ್" },
  hindi: { en: "Hindi", hi: "हिंदी", kn: "ಹಿಂದಿ" },
  kannada: { en: "Kannada", hi: "कन्नड़", kn: "ಕನ್ನಡ" },
  continue: { en: "Continue", hi: "जारी रखें", kn: "ಮುಂದುವರಿಸಿ" },
  dashboard: { en: "Dashboard", hi: "डैशबोर्ड", kn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್" },
  map: { en: "Map", hi: "नक्शा", kn: "ನಕ್ಷೆ" },
  insights: { en: "Insights", hi: "जानकारी", kn: "ಒಳನೋಟಗಳು" },
  alerts: { en: "Alerts", hi: "अलर्ट", kn: "ಎಚ್ಚರಿಕೆಗಳು" },
  profile: { en: "Profile", hi: "प्रोफ़ाइल", kn: "ಪ್ರೊಫೈಲ್" },
  cropHealth: { en: "Crop Health", hi: "फसल स्वास्थ्य", kn: "ಬೆಳೆ ಆರೋಗ್ಯ" },
  soilMoisture: { en: "Soil Moisture", hi: "मिट्टी की नमी", kn: "ಮಣ್ಣಿನ ತೇವಾಂಶ" },
  irrigation: { en: "Irrigation", hi: "सिंचाई", kn: "ನೀರಾವರಿ" },
  groundwater: { en: "Groundwater Level", hi: "भूजल स्तर", kn: "ಅಂತರ್ಜಲ ಮಟ್ಟ" },
  temperature: { en: "Temperature", hi: "तापमान", kn: "ತಾಪಮಾನ" },
  humidity: { en: "Humidity", hi: "आर्द्रता", kn: "ಆರ್ದ್ರತೆ" },
  rainfall: { en: "Rainfall", hi: "वर्षा", kn: "ಮಳೆ" },
  healthy: { en: "Healthy", hi: "स्वस्थ", kn: "ಆರೋಗ್ಯಕರ" },
  moderate: { en: "Moderate", hi: "मध्यम", kn: "ಮಧ್ಯಮ" },
  critical: { en: "Critical", hi: "गंभीर", kn: "ನಿರ್ಣಾಯಕ" },
  irrigationNeeded: { en: "Irrigation Needed", hi: "सिंचाई की आवश्यकता", kn: "ನೀರಾವರಿ ಅಗತ್ಯವಿದೆ" },
  noIrrigationNeeded: { en: "No Irrigation Needed", hi: "सिंचाई की आवश्यकता नहीं", kn: "ನೀರಾವರಿ ಅಗತ್ಯವಿಲ್ಲ" },
  farmerName: { en: "Farmer Name", hi: "किसान का नाम", kn: "ರೈತ ಹೆಸರು" },
  landSize: { en: "Land Size", hi: "भूमि आकार", kn: "ಭೂಮಿ ಗಾತ್ರ" },
  cropType: { en: "Crop Type", hi: "फसल प्रकार", kn: "ಬೆಳೆ ಪ್ರಕಾರ" },
  location: { en: "Location", hi: "स्थान", kn: "ಸ್ಥಳ" },
  detectLocation: { en: "Detect Location", hi: "स्थान पहचानें", kn: "ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಿ" },
  enterManually: { en: "Enter Manually", hi: "मैन्युअल रूप से दर्ज करें", kn: "ಕೈಯಾರೆ ನಮೂದಿಸಿ" },
  weatherAlerts: { en: "Weather Alerts", hi: "मौसम अलर्ट", kn: "ಹವಾಮಾನ ಎಚ್ಚರಿಕೆಗಳು" },
  noAlerts: { en: "No alerts at this time", hi: "इस समय कोई अलर्ट नहीं", kn: "ಈ ಸಮಯದಲ್ಲಿ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ" },
  lastUpdated: { en: "Last Updated", hi: "अंतिम अपडेट", kn: "ಕೊನೆಯ ನವೀಕರಣ" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to load saved language from localStorage
    const saved = localStorage.getItem("agropulse_language");
    return (saved as Language) || "en";
  });

  const setLanguageWithPersist = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("agropulse_language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: setLanguageWithPersist, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}