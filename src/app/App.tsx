import { RouterProvider } from "react-router";
import { router } from "./routes";
import { LanguageProvider } from "./context/LanguageContext";
import { LocationProvider } from "./context/LocationContext";

export default function App() {
  return (
    <LanguageProvider>
      <LocationProvider>
        <div className="size-full bg-gray-900 flex items-center justify-center">
          {/* Mobile App Container */}
          <div className="w-full max-w-md h-full bg-white shadow-2xl overflow-hidden">
            <RouterProvider router={router} />
          </div>
        </div>
      </LocationProvider>
    </LanguageProvider>
  );
}