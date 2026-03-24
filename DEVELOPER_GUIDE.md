# Developer Guide - AgroPulse

Complete technical documentation for developers working on AgroPulse.

## Project Structure

```
/src
  /app
    /components          # Reusable components
      /ui               # UI library components
      MainLayout.tsx    # Main app layout with bottom nav
      LoadingScreen.tsx # Loading state component
      ErrorFallback.tsx # Error boundary component
    
    /context            # React Context providers
      LanguageContext.tsx    # Multi-language support
      LocationContext.tsx    # GPS location management
    
    /screens            # Main app screens
      Login.tsx              # Phone number login
      LanguageSelection.tsx  # Language picker
      Dashboard.tsx          # Home screen
      SatelliteMap.tsx       # Map with NDVI overlay
      Insights.tsx           # Charts and analytics
      Alerts.tsx             # Weather alerts
      Profile.tsx            # User profile
      NotFound.tsx           # 404 page
    
    /services           # API and business logic
      weatherService.ts      # Weather & satellite data
    
    /types              # TypeScript type definitions
      index.ts
    
    /utils              # Helper functions
      formatters.ts          # Data formatting utilities
    
    /constants          # App constants
      index.ts               # Configuration values
    
    App.tsx             # Root component
    routes.tsx          # React Router configuration

  /imports              # Figma imported assets
  /styles               # CSS files
```

## Key Technologies

- **React 18.3**: UI framework
- **TypeScript**: Type safety
- **React Router 7**: Client-side routing
- **Tailwind CSS 4**: Styling
- **Recharts**: Data visualization
- **Lucide React**: Icon library

## State Management

### Context Providers

1. **LanguageContext**
   - Manages selected language (en, hi, kn)
   - Provides translation function `t(key)`
   - Persists to localStorage

2. **LocationContext**
   - Manages GPS coordinates
   - Auto-detects location on mount
   - Provides manual location entry

### Local State
- Component-level state with `useState`
- Form state managed locally
- API data cached in component state

## Routing Structure

```
/ → Login
/language → Language Selection
/app → Main Layout
  /app → Dashboard (index)
  /app/map → Satellite Map
  /app/insights → Insights & Charts
  /app/alerts → Weather Alerts
  /app/profile → User Profile
* → 404 Not Found
```

## Data Flow

### Weather Data
```
User Location
  ↓
LocationContext
  ↓
Dashboard/Screens
  ↓
fetchWeatherData(lat, lng)
  ↓
OpenWeatherMap API (or mock)
  ↓
Display Weather Cards
```

### NDVI Calculation
```
User Location
  ↓
calculateNDVI(location)
  ↓
Mock Algorithm (or Satellite API)
  ↓
estimateSoilMoisture(ndvi, weather)
  ↓
Display Crop Health
```

### Irrigation Recommendation
```
Soil Moisture + Temperature
  ↓
getIrrigationRecommendation(moisture, temp)
  ↓
Logic:
  IF moisture < 40% AND temp > 30°C
    → Irrigation strongly recommended
  ELSE IF moisture < 40%
    → Irrigation recommended
  ELSE
    → No irrigation needed
```

## Styling Guide

### Color Palette
```css
Primary: #16a34a (green-600)
Secondary: #15803d (green-700)
Accent: #22c55e (green-500)
Background: #f9fafb (gray-50)
Error: #dc2626 (red-600)
Warning: #ea580c (orange-600)
Info: #0284c7 (sky-600)
```

### Status Colors
- 🟢 Green: Healthy (NDVI > 0.6, Moisture > 60%)
- 🟡 Yellow: Moderate (NDVI 0.3-0.6, Moisture 30-60%)
- 🔴 Red: Critical (NDVI < 0.3, Moisture < 30%)

### Responsive Design
- Mobile-first approach
- Max width: 28rem (448px) on desktop
- Full width on mobile devices
- Bottom navigation for easy thumb access

## Adding New Features

### 1. Add a New Screen

```typescript
// 1. Create screen component
// /src/app/screens/NewScreen.tsx
export function NewScreen() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-full bg-gray-50">
      {/* Screen content */}
    </div>
  );
}

// 2. Add route
// /src/app/routes.tsx
import { NewScreen } from "./screens/NewScreen";

// Add to children of /app route
{ path: "new", Component: NewScreen }

// 3. Add navigation button
// /src/app/components/MainLayout.tsx
{ path: "/app/new", icon: IconName, label: t("newScreen") }

// 4. Add translations
// /src/app/context/LanguageContext.tsx
newScreen: { 
  en: "New Screen", 
  hi: "नया स्क्रीन", 
  kn: "ಹೊಸ ಪರದೆ" 
}
```

### 2. Add a New Language

```typescript
// /src/app/context/LanguageContext.tsx

// 1. Update type
type Language = "en" | "hi" | "kn" | "ta"; // Add Tamil

// 2. Add translations
const translations: Translations = {
  welcome: { 
    en: "Welcome to AgroPulse", 
    hi: "AgroPulse में आपका स्वागत है", 
    kn: "AgroPulse ಗೆ ಸ್ವಾಗತ",
    ta: "AgroPulse க்கு வரவேற்கிறோம்" // Add Tamil
  },
  // ... add for all keys
};

// 3. Update LanguageSelection screen
// /src/app/screens/LanguageSelection.tsx
const languages = [
  { code: "en" as const, name: "English", nativeName: "English" },
  { code: "hi" as const, name: "Hindi", nativeName: "हिंदी" },
  { code: "kn" as const, name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ta" as const, name: "Tamil", nativeName: "தமிழ்" },
];
```

### 3. Add a New API Service

```typescript
// /src/app/services/newService.ts

export interface NewData {
  // Define data structure
}

export async function fetchNewData(): Promise<NewData> {
  try {
    const response = await fetch('API_URL');
    if (!response.ok) throw new Error('API failed');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    return getMockData();
  }
}

function getMockData(): NewData {
  // Return fallback data
  return { /* mock data */ };
}
```

### 4. Add a New Chart

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Mon', value: 100 },
  { name: 'Tue', value: 120 },
  // ...
];

<ResponsiveContainer width="100%" height={200}>
  <LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Line 
      type="monotone" 
      dataKey="value" 
      stroke="#22c55e" 
      strokeWidth={2} 
    />
  </LineChart>
</ResponsiveContainer>
```

## Testing

### Manual Testing Checklist

- [ ] Login with 10-digit phone number
- [ ] Select language and verify persistence
- [ ] Check location detection
- [ ] Verify weather data display
- [ ] Test NDVI calculation
- [ ] Check irrigation recommendations
- [ ] View satellite map
- [ ] Navigate through all screens
- [ ] Test bottom navigation
- [ ] Verify responsive design
- [ ] Test language switching
- [ ] Check error states
- [ ] Test offline behavior

### Browser Testing

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (iOS)
- Chrome Mobile (Android)

## Performance Optimization

### Code Splitting
React Router automatically splits routes into chunks.

### Image Optimization
- Use WebP format when possible
- Implement lazy loading for images
- Use appropriate image sizes

### API Caching
```typescript
// Cache weather data for 10 minutes
const CACHE_DURATION = 10 * 60 * 1000;
const cache = new Map();

function getCachedData(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}
```

### Debouncing/Throttling
```typescript
import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
```

## Common Patterns

### Loading States
```typescript
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  async function loadData() {
    setLoading(true);
    const result = await fetchData();
    setData(result);
    setLoading(false);
  }
  loadData();
}, []);

if (loading) return <LoadingScreen />;
return <div>{/* Display data */}</div>;
```

### Error Handling
```typescript
const [error, setError] = useState<Error | null>(null);

try {
  const data = await fetchData();
} catch (err) {
  setError(err as Error);
  // Optionally show error UI
}
```

### Form Handling
```typescript
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Process form data
};
```

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create `.env` file:
```
VITE_OPENWEATHER_API_KEY=your_key_here
VITE_SENTINEL_TOKEN=your_token_here
```

Access in code:
```typescript
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
```

### Hosting Options
- Vercel (recommended)
- Netlify
- Firebase Hosting
- GitHub Pages

## Troubleshooting

### Location Not Detected
- Check browser permissions
- Ensure HTTPS (required for geolocation)
- Fallback to default location is automatic

### API Errors
- Check API key configuration
- Verify network connectivity
- Check browser console for errors
- Mock data serves as automatic fallback

### Styling Issues
- Clear Tailwind cache: `rm -rf node_modules/.cache`
- Rebuild: `npm run build`
- Check for class name conflicts

## Contributing

1. Follow existing code style
2. Add TypeScript types
3. Test on mobile devices
4. Update documentation
5. Handle errors gracefully
6. Provide mock data fallbacks

## Resources

- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Recharts](https://recharts.org)
- [Lucide Icons](https://lucide.dev)
- [OpenWeatherMap API](https://openweathermap.org/api)
