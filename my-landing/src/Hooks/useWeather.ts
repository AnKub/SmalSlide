import { useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

interface WeatherResponse {
  name: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

const CACHE_DURATION = 30 * 60 * 1000; // 30 хв

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<WeatherResponse>(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            lat,
            lon,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      setWeather(response.data);
      localStorage.setItem("weather", JSON.stringify(response.data));
      localStorage.setItem("lastFetch", Date.now().toString());
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = () => {
    const lastFetch = localStorage.getItem("lastFetch");

    const shouldFetch =
      !lastFetch || Date.now() - Number(lastFetch) > CACHE_DURATION;

    if (!shouldFetch) return;

    if (!API_KEY) {
      setError("API key is missing. Please check your .env file.");
      return;
    }

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        setError("Unable to retrieve your location.");
      }
    );
  };

  const loadFromCache = () => {
    const cached = localStorage.getItem("weather");
    if (cached) {
      setWeather(JSON.parse(cached));
    }
  };

  return { weather, error, loading, fetchWeather, loadFromCache, setError };
};
