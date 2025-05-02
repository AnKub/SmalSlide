# 🌦️ Weather Widget App

A lightweight and responsive weather widget built with React, Mantine UI, and OpenWeather API.  
It fetches real-time weather data based on the user's geolocation and displays a compact mini-widget as well as a full weather card.

---

## 🚀 Features

- 🌍 **Geolocation-Based Forecast** – Automatically detects user's location.
- 🌤️ **Weather Data from OpenWeather API** – Temperature, description, and icon.
- 💾 **Local Storage Caching** – Avoids repeated API calls (updates only every 30 mins).
- 🔁 **Manual Refresh** – Users can refresh the data on demand.
- 🧩 **Reusable Weather Hook** – Custom hook to manage API logic, errors, and loading state.
- 🚨 **Error Notifications** – User-friendly error messages using Mantine notifications.
- ⚡ **Optimized API Requests** – Reduces risk of exceeding free tier API limits.
- 🎨 **Stylish UI** – Clean, modern design using Mantine and custom SCSS modules.

---

## 🛠️ Tech Stack

- **React** (TypeScript)
- **Mantine UI** – UI components and notifications
- **Axios** – For HTTP requests
- **OpenWeatherMap API** – External weather data provider
- **SCSS Modules** – Scoped styles
- **Vite** – Fast development build tool

---

## 📂 Project Structure

src/ ├── components/ │ ├── MiniWeather.tsx # Compact widget version │ └── Weather.tsx # Full card with details ├── hooks/ │ └── useWeather.ts # Custom weather-fetching logic ├── styles/ │ ├── MiniWeather.module.scss │ └── Weather.module.scss ├── App.tsx └── main.tsx

yaml
Копировать код

---

## 📦 Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/weather-widget.git
cd weather-widget
Install dependencies:

bash
Копировать код
npm install
Create .env file:

env
Копировать код
VITE_WEATHER_API_KEY=your_openweather_api_key
Run the app locally:

bash
Копировать код
npm run dev
🌐 API Reference
OpenWeatherMap
Free tier: 60 calls/minute (avoid excessive automatic polling).

📸 Screenshots
Mini Widget	Full Weather Card

🧠 Future Improvements
Search weather by city name

Multi-language support

Dark/light theme toggle

Display hourly forecast

🧑‍💻 Author
Andriy Kulyk
Frontend Developer | React Enthusiast | UI Lover
GitHub

📄 License
This project is open source and available under the MIT License.