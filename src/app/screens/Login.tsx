import { useState } from "react";
import { useNavigate } from "react-router";
import { Sprout, Phone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      navigate("/language");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-600 rounded-full p-6 mb-4 shadow-lg">
            <Sprout className="size-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-800 mb-2">AgroPulse</h1>
          <p className="text-green-700 text-center">Satellite-based Agricultural Insights</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            {t("welcome")}
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                {t("phoneNumber")}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-xl shadow-lg transition-colors text-lg"
            >
              {t("login")}
            </button>
          </form>

          <p className="text-gray-500 text-sm text-center mt-6">
            Mock login - Enter any 10-digit number
          </p>
        </div>
      </div>
    </div>
  );
}
