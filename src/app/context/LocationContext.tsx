import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface LocationContextType {
  location: { lat: number; lng: number } | null;
  locationName: string;
  setLocation: (loc: { lat: number; lng: number }) => void;
  setLocationName: (name: string) => void;
  detectLocation: () => void;
  isDetecting: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [isDetecting, setIsDetecting] = useState(false);

  const detectLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsDetecting(false);
        },
        () => {
          // Fallback to default location if permission denied
          setLocation({ lat: 12.9716, lng: 77.5946 }); // Bangalore
          setLocationName("Bangalore, Karnataka");
          setIsDetecting(false);
        }
      );
    } else {
      // Default location
      setLocation({ lat: 12.9716, lng: 77.5946 });
      setLocationName("Bangalore, Karnataka");
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    // Auto-detect on mount
    detectLocation();
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        locationName,
        setLocation,
        setLocationName,
        detectLocation,
        isDetecting,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider");
  }
  return context;
}
