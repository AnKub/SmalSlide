import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

interface GeoResponse {
  lat: number;
  lon: number;
  name: string;
}

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState("");
  const [showHighlight, setShowHighlight] = useState(false);

  const fetchWeather = async (city: string) => {
    if (!API_KEY) {
      setError("API key is missing. Please check your .env file.");
      return;
    }

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError("");

      const geoResponse = await axios.get<GeoResponse[]>(
        "https://api.openweathermap.org/geo/1.0/direct",
        { params: { q: city, limit: 1, appid: API_KEY } }
      );

      if (geoResponse.data.length === 0) {
        throw new Error("City not found.");
      }

      const { lat, lon } = geoResponse.data[0];

      const weatherResponse = await axios.get<WeatherResponse>(
        "https://api.openweathermap.org/data/2.5/weather",
        { params: { lat, lon, appid: API_KEY, units: "metric" } }
      );

      setWeather(weatherResponse.data);
      localStorage.setItem("weather", JSON.stringify(weatherResponse.data));
      localStorage.setItem("lastFetch", Date.now().toString());

      setShowHighlight(true);
      setTimeout(() => setShowHighlight(false), 2000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred.");
      }
    }
  };

  return { weather, error, fetchWeather, setError, showHighlight }; // ← Додано setError
};
