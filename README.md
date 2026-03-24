# AgroPulse - Satellite-based Agricultural Insights

A mobile-responsive web application that provides farmers with satellite-based agricultural insights including crop health monitoring, weather data, soil moisture estimation, and irrigation recommendations.

## Features

### 1. **Authentication**
- Simple phone number login (mock implementation)
- Multi-language support (English, Hindi, Kannada)

### 2. **Home Dashboard**
- Real-time weather data (temperature, humidity, rainfall)
- Crop health monitoring (NDVI values)
- Soil moisture estimation
- Irrigation recommendations
- Groundwater level indicators
- Color-coded health status (Green/Yellow/Red)

### 3. **Satellite Map Screen**
- Interactive farm location visualization
- NDVI overlay visualization
- Zoom controls
- Toggle NDVI layer on/off

### 4. **Insights Screen**
- Historical trend analysis (7-day data)
- Temperature and humidity charts
- NDVI trend visualization
- Soil moisture tracking
- Interactive charts using Recharts

### 5. **Alerts System**
- Weather-based alerts
- Temperature warnings
- Humidity notifications
- Rainfall updates
- Weather advisory

### 6. **Profile Management**
- Farmer information
- Farm details (land size, crop type)
- Location management
- Language selection
- Dark mode toggle (UI only)
- Settings customization

## Tech Stack

- **Frontend**: React 18.3 with TypeScript
- **Routing**: React Router v7 (Data mode)
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Icons**: Lucide React
- **API**: OpenWeatherMap (configurable)

## Setup Instructions

### Weather API Configuration

To use real weather data:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `/src/app/services/weatherService.ts`
3. Replace `YOUR_API_KEY_HERE` with your actual API key:

```typescript
const API_KEY = "your_actual_api_key_here";
```

> **Note**: Without an API key, the app uses mock weather data.

### Satellite Data Integration

The current implementation uses mock NDVI data. To integrate real satellite data:

1. Choose a satellite data provider:
   - [Sentinel Hub](https://www.sentinel-hub.com/)
   - [Landsat API](https://www.usgs.gov/landsat-missions/landsat-data-access)
   - [Planet Labs](https://www.planet.com/)

2. Update the `calculateNDVI` function in `/src/app/services/weatherService.ts`

3. Implement API calls to fetch real NDVI data based on coordinates

## Usage

1. **Login**: Enter any 10-digit phone number
2. **Language Selection**: Choose your preferred language
3. **Dashboard**: View current farm conditions and recommendations
4. **Map**: Visualize your farm with NDVI overlay
5. **Insights**: Analyze historical trends
6. **Alerts**: Check weather alerts and advisories
7. **Profile**: Manage your farm details and settings

## Data Handling

### Offline Capability
- Last fetched data is displayed when offline
- Timestamp shows when data was last updated
- Auto-refresh on reconnection

### Mock Data
- Weather data: Realistic mock values when API key not configured
- NDVI: Calculated using location-based algorithm
- Soil moisture: Estimated from NDVI and weather conditions
- Groundwater: Derived from soil moisture levels

### Recommendation Engine

Irrigation logic:
```
IF soil_moisture < 40% AND temperature > 30°C:
    Irrigation strongly recommended
ELSE IF soil_moisture < 40%:
    Irrigation recommended
ELSE:
    No irrigation needed
```

## Color Indicators

- 🟢 **Green**: Healthy/Adequate (NDVI > 0.6, Moisture > 60%)
- 🟡 **Yellow**: Moderate (NDVI 0.3-0.6, Moisture 30-60%)
- 🔴 **Red**: Critical (NDVI < 0.3, Moisture < 30%)

## Design Philosophy

- **Mobile-First**: Optimized for smartphone screens
- **Icon-Based**: Visual indicators for easy understanding
- **Simple Navigation**: Bottom tab bar for quick access
- **Regional Languages**: Support for local languages
- **Clean UI**: Card-based layout with earthy green colors

## Future Enhancements

- [ ] Real-time satellite data integration
- [ ] ML-based crop disease detection
- [ ] Voice assistant integration
- [ ] Push notifications for alerts
- [ ] Crop yield prediction
- [ ] Market price information
- [ ] Community features
- [ ] Offline data caching with Service Workers

## Target Users

Small and marginal farmers with basic smartphone knowledge who need:
- Simple, intuitive interface
- Icon-based navigation
- Regional language support
- Actionable agricultural insights

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## License

This project is a demonstration application. Customize as needed for production use.
