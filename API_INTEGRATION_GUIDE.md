# API Integration Guide for AgroPulse

This guide explains how to integrate real APIs for weather data and satellite imagery.

## Weather API (OpenWeatherMap)

### Current Setup
The app currently uses mock weather data as a fallback.

### Integration Steps

1. **Get API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to your API keys section
   - Copy your API key

2. **Configure the App**
   - Open `/src/app/services/weatherService.ts`
   - Replace `YOUR_API_KEY_HERE` with your actual API key
   ```typescript
   const API_KEY = "your_actual_api_key_here";
   ```

3. **Testing**
   - The app will automatically use real data once the key is configured
   - If the API call fails, it falls back to mock data
   - Check browser console for any error messages

### Free Tier Limits
- 1,000 API calls per day
- 60 calls per minute
- Current weather data
- 5-day forecast

## Satellite Data API (Sentinel Hub)

### Overview
Sentinel Hub provides access to Sentinel-2 satellite imagery for calculating real NDVI values.

### Integration Steps

1. **Setup Account**
   - Visit [Sentinel Hub](https://www.sentinel-hub.com/)
   - Create an account
   - Get your instance ID and access token

2. **Install Additional Package**
   ```bash
   npm install @sentinel-hub/sentinelhub-js
   ```

3. **Update Weather Service**
   
   Add to `/src/app/services/weatherService.ts`:
   
   ```typescript
   import { S2L2ALayer, setAuthToken } from '@sentinel-hub/sentinelhub-js';

   const SENTINEL_INSTANCE_ID = 'your_instance_id';
   const SENTINEL_TOKEN = 'your_access_token';

   export async function fetchRealNDVI(lat: number, lng: number): Promise<number> {
     setAuthToken(SENTINEL_TOKEN);
     
     const layer = new S2L2ALayer({
       instanceId: SENTINEL_INSTANCE_ID,
       layerId: 'NDVI',
     });

     const bounds = {
       geometry: {
         type: 'Point',
         coordinates: [lng, lat],
       },
     };

     // Fetch NDVI data
     const response = await layer.getMap({
       bbox: bounds,
       fromTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
       toTime: new Date(),
       width: 512,
       height: 512,
     });

     // Process response to calculate NDVI
     // Implementation depends on specific requirements
     return processNDVIData(response);
   }
   ```

4. **Update calculateNDVI Function**
   ```typescript
   export async function calculateNDVI(location: { lat: number; lng: number }): Promise<number> {
     try {
       return await fetchRealNDVI(location.lat, location.lng);
     } catch (error) {
       console.error('Sentinel Hub error, using mock data:', error);
       // Fallback to mock calculation
       const baseNDVI = 0.6 + (Math.sin(location.lat) * 0.2);
       const randomVariation = (Math.random() * 0.2) - 0.1;
       return Math.max(0, Math.min(1, baseNDVI + randomVariation));
     }
   }
   ```

## Alternative Satellite APIs

### Google Earth Engine

**Pros:**
- Free for research/educational use
- Extensive satellite data archive
- Powerful analysis tools

**Setup:**
1. Sign up at [Google Earth Engine](https://earthengine.google.com/)
2. Get access to Earth Engine API
3. Use `@google/earthengine` npm package

### Planet Labs

**Pros:**
- High-resolution imagery
- Daily updates
- Good API documentation

**Setup:**
1. Visit [Planet Labs](https://www.planet.com/)
2. Sign up for developer account
3. Get API key
4. Use REST API for data access

### NASA Landsat

**Pros:**
- Free and open data
- Long historical archive
- Multiple spectral bands

**Setup:**
1. Visit [USGS Earth Explorer](https://earthexplorer.usgs.gov/)
2. Register for account
3. Use Landsat API or download data manually

## Map Integration (Google Maps)

### Current Setup
The app uses a custom-drawn map visualization.

### Google Maps Integration

1. **Get API Key**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Get API key

2. **Install Package**
   ```bash
   npm install @react-google-maps/api
   ```

3. **Update SatelliteMap Component**
   ```typescript
   import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

   export function SatelliteMap() {
     const { location } = useLocation();
     
     return (
       <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
         <GoogleMap
           mapContainerStyle={{ width: '100%', height: '100%' }}
           center={{ lat: location.lat, lng: location.lng }}
           zoom={15}
           mapTypeId="satellite"
         >
           <Marker position={{ lat: location.lat, lng: location.lng }} />
         </GoogleMap>
       </LoadScript>
     );
   }
   ```

## Testing with Mock Data

All services have fallback mock data implementations:
- Weather: Uses time-based mock values
- NDVI: Calculated from coordinates
- Soil Moisture: Derived from NDVI and weather
- Alerts: Generated based on conditions

This allows testing without API keys during development.

## Rate Limiting

Implement rate limiting to avoid exceeding API quotas:

```typescript
// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function fetchWeatherData(lat: number, lng: number): Promise<WeatherData> {
  const cacheKey = `${lat},${lng}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  
  const data = await actualAPICall(lat, lng);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  
  return data;
}
```

## Error Handling

Always implement proper error handling:

```typescript
try {
  const data = await fetchFromAPI();
  return data;
} catch (error) {
  console.error('API Error:', error);
  // Log to error tracking service (e.g., Sentry)
  // Return mock data as fallback
  return getMockData();
}
```

## Production Considerations

1. **Environment Variables**
   - Store API keys in `.env` file
   - Never commit API keys to version control
   - Use different keys for development/production

2. **Backend Proxy**
   - Consider proxying API calls through your backend
   - Protects API keys from client exposure
   - Allows server-side caching and rate limiting

3. **Monitoring**
   - Track API usage
   - Monitor error rates
   - Set up alerts for quota limits

4. **Offline Support**
   - Implement Service Workers
   - Cache API responses
   - Show last updated timestamp
