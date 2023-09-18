# 🌦 Angular Weather Forecast Application

## 📋 Overview
This application allows users to search for weather forecasts either by the hour (`hourly`) or by the day (`daily`) for a specific city. It uses Angular for the frontend and makes calls to the OpenWeatherMap API for weather and geolocation data.

## 🛠 Requirements

- Angular 🅰️
- Angular Material (for UI) 🎨
- RxJS 🔄

## 💾 Installation

1. Clone the repository: ```git clone [url]``` 📂
2. Navigate to the project directory: ```cd weather``` 🗂
3. Install dependencies ```npm install``` 📦
4. Run the application: ```npm run start``` or ```ng s``` 🚀

## 🌟 Features

- **🏙 Search by City:** Allows users to search for weather forecasts by city name.
- **⏰ Hourly and Daily Filters:** Users can toggle between hourly and daily forecasts.
- **📊 Dynamic Table:** The UI contains a dynamic table that lists the cities along with their temperature forecasts.
- **📱 Responsive UI:** Uses Angular Material to provide a clean, responsive interface.
- **🔧 Pipes:** Custom Angular pipes are used for data formatting.
  
## 🔄 How it Works

1. **🏙 Search by City:** The user inputs a city name and clicks the 'Search' button.
    - The application first fetches the latitude and longitude of the city using `http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=1&appid={API key}`.
    - Then, it fetches the temperature data based on the latitude and longitude.

2. **Filter Presets:** The user can switch between `hourly` and `daily` forecasts.
    - For `hourly` data, the API endpoint used is `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,daily,alerts&appid={API key}`.
    - For `daily` data, the API endpoint used is `https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly,alerts&appid={API key}`.

3. **Dynamic Table:** A dynamic table is used to display the fetched data.

## Testing

Unit tests are optional but recommended for robustness.

## Contributing

Please fork the repository and create a pull request or open an issue to propose changes and improvements.

