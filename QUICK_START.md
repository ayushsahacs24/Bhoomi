# Quick Start Guide - AgroPulse

Get started with AgroPulse in minutes!

## What is AgroPulse?

AgroPulse is a mobile-friendly web application that helps farmers make informed decisions about irrigation, crop health, and resource management using satellite data and weather information.

## Features at a Glance

✅ **Real-time Weather Data** - Temperature, humidity, rainfall  
✅ **Crop Health Monitoring** - NDVI-based vegetation index  
✅ **Soil Moisture Tracking** - Estimated moisture levels  
✅ **Smart Irrigation Advice** - Data-driven recommendations  
✅ **Satellite Visualization** - Map view with NDVI overlay  
✅ **Historical Insights** - 7-day trend analysis with charts  
✅ **Weather Alerts** - Notifications for critical conditions  
✅ **Multi-language Support** - English, Hindi, Kannada  

## Getting Started

### Step 1: Login
1. Open the app
2. Enter any 10-digit mobile number (mock login)
3. Click "Login"

### Step 2: Select Language
1. Choose your preferred language:
   - English
   - हिंदी (Hindi)
   - ಕನ್ನಡ (Kannada)
2. Click "Continue"

### Step 3: Explore the Dashboard
The dashboard shows:
- Current weather conditions
- Crop health status (Green = Healthy, Yellow = Moderate, Red = Critical)
- Soil moisture level
- Irrigation recommendation
- Groundwater level estimate

## Using the App

### 🏠 Dashboard (Home)
**What you'll see:**
- Weather cards showing temperature, humidity, and rainfall
- Crop health card with NDVI value
- Soil moisture indicator
- Irrigation recommendation
- Groundwater level

**Action items:**
- Tap the refresh icon to update data
- Check color indicators (Green/Yellow/Red)
- Follow irrigation recommendations

### 🗺️ Satellite Map
**What you'll see:**
- Your farm location marked on the map
- NDVI color overlay (when enabled)
- Zoom controls
- NDVI legend

**How to use:**
- Toggle "NDVI Layer" button to show/hide crop health overlay
- Use + and - buttons to zoom in/out
- Green areas = healthy crops
- Yellow areas = moderate health
- Red areas = stressed vegetation

### 📊 Insights
**What you'll see:**
- Current metrics (NDVI, temperature, humidity, soil moisture)
- Temperature and humidity trend (7 days)
- Crop health trend chart
- Soil moisture trend
- Key insights summary

**How to use:**
- Scroll through different charts
- Look for trends over the week
- Read key insights for actionable advice

### 🔔 Alerts
**What you'll see:**
- Active weather alerts
- Weather advisory for upcoming days
- Recommendations

**Alert types:**
- ⚠️ **Warning** - Urgent conditions (high heat, low humidity)
- ℹ️ **Info** - General advisories (rainfall, moderate conditions)

### 👤 Profile
**What you can do:**
- Edit your farmer name
- Update land size
- Select crop type
- Change language
- Detect location
- Toggle dark mode (UI only)
- Logout

## Understanding the Data

### NDVI (Normalized Difference Vegetation Index)
- **Range**: 0 to 1
- **>0.6**: Healthy vegetation (Green)
- **0.3-0.6**: Moderate health (Yellow)
- **<0.3**: Stressed crops (Red)

### Soil Moisture
- **Range**: 0% to 100%
- **>60%**: Adequate moisture (Green)
- **30-60%**: Moderate moisture (Yellow)
- **<30%**: Low moisture (Red)

### Irrigation Recommendation
The app recommends irrigation when:
- Soil moisture < 40% **AND** temperature > 30°C → **Strongly Recommended**
- Soil moisture < 40% → **Recommended**
- Otherwise → **Not Needed**

## Tips for Best Results

### 📍 Location
- Allow browser location access for accurate weather data
- Or manually enter your village/location
- Location is auto-detected when the app loads

### 🔄 Refreshing Data
- Tap the refresh icon on the dashboard
- Data auto-refreshes when you return to the app
- Last updated time is shown at the bottom

### 💬 Language
- Change language anytime from Profile screen
- Your preference is saved automatically
- All screens update instantly

### 📱 Mobile Usage
- Works best on smartphones
- Use portrait orientation
- Bottom navigation for easy access
- Swipe/scroll through charts and content

## Understanding Color Indicators

### 🟢 Green
- **Crop Health**: Excellent vegetation
- **Soil Moisture**: Adequate water
- **Action**: Continue current practices

### 🟡 Yellow
- **Crop Health**: Moderate vegetation
- **Soil Moisture**: Monitor closely
- **Action**: Check regularly, prepare for irrigation

### 🔴 Red
- **Crop Health**: Stressed vegetation
- **Soil Moisture**: Critical shortage
- **Action**: Immediate irrigation recommended

## Frequently Asked Questions

### Is internet required?
Yes, for real-time weather data. However, the last fetched data is cached and shown when offline.

### How often is data updated?
- Weather data: Every 10 minutes (when refreshed)
- Satellite data: Daily (in production with real API)
- Location: When manually updated or auto-detected

### Is my data saved?
- Language preference: Saved locally
- Profile information: Stored in browser
- No data is sent to external servers (except API calls)

### Can I use this for multiple farms?
Currently supports one farm location per session. Update location in Profile to switch farms.

### What crops are supported?
All crop types. The NDVI value works for any vegetation. Select your crop type in Profile for reference.

### Why is location important?
Location is used to fetch:
- Local weather data
- Satellite imagery of your farm
- Accurate NDVI calculations
- Relevant alerts and recommendations

## Privacy & Data

- No personal information is collected
- API calls only for weather and satellite data
- Location used only for data fetching
- All data stored locally in your browser
- No data sharing with third parties

## Need Help?

### Data Not Loading?
1. Check internet connection
2. Refresh the page
3. Try changing location
4. Check browser console for errors

### Location Issues?
1. Enable browser location permissions
2. Use manual location entry
3. Ensure HTTPS connection
4. Try default location (Bangalore)

### Charts Not Showing?
1. Ensure data has loaded
2. Refresh the page
3. Try different screen

## Next Steps

1. ✅ Complete profile information
2. ✅ Set your farm location accurately
3. ✅ Check dashboard daily for updates
4. ✅ Monitor trends in Insights screen
5. ✅ Act on irrigation recommendations
6. ✅ Enable weather alerts

## Technical Note

**For Developers:**
- See `/README.md` for setup instructions
- See `/DEVELOPER_GUIDE.md` for technical details
- See `/API_INTEGRATION_GUIDE.md` for API configuration

**Current Version:** 1.0.0  
**Platform:** Web (Mobile-optimized)  
**Technologies:** React, TypeScript, Tailwind CSS

---

**Happy Farming! 🌾**

*AgroPulse - Empowering Farmers with Data-Driven Insights*
