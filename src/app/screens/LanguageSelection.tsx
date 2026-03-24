import { useNavigate } from "react-router";
import { Languages, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSelection() {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "en" as const, name: "English", nativeName: "English" },
    { code: "hi" as const, name: "Hindi", nativeName: "हिंदी" },
    { code: "kn" as const, name: "Kannada", nativeName: "ಕನ್ನಡ" },
  ];

  const handleContinue = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-600 rounded-full p-6 mb-4 shadow-lg">
            <Languages className="size-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {t("selectLanguage")}
          </h1>
          <p className="text-green-700 text-center">Choose your preferred language</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`w-full p-6 rounded-xl border-2 transition-all flex items-center justify-between ${
                language === lang.code
                  ? "border-green-600 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
            >
              <div className="text-left">
                <div className="font-semibold text-gray-800 text-lg">{lang.nativeName}</div>
                <div className="text-gray-500 text-sm">{lang.name}</div>
              </div>
              {language === lang.code && (
                <Check className="size-6 text-green-600" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors text-lg"
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
}
