import React, { useEffect } from "react";
import { useWeather } from "../Hooks/useWeather";
import { Image, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications"; 
import { IconAlertCircle } from "@tabler/icons-react";
import styles from "../styles/MiniWeather.module.scss";

const MiniWeather: React.FC = () => {
  const { weather, fetchWeather, setError, error } = useWeather();

  useEffect(() => {
    const saved = localStorage.getItem("weather");
    const lastFetch = localStorage.getItem("lastFetch");
  
    const shouldFetch =
      !saved ||
      !lastFetch ||
      Date.now() - Number(lastFetch) > 30 * 60 * 1000;
  
    if (shouldFetch) {
      fetchWeather("Magdeburg");
    }
  }, [fetchWeather]);

  // трохи toast, якщо  помилка
  useEffect(() => {
    if (error) {
      showNotification({
        title: "Weather Error",
        message: error,
        color: "red",
        icon: <IconAlertCircle size="0.2rem" />,
      });
  
      const timeout = setTimeout(() => setError(""), 5000); 
      return () => clearTimeout(timeout);
    }
  }, [error, setError]);
  

  if (!weather) return null;

  return (
    <div className={styles.miniWeather}>
      <Image
        src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        alt="weather icon"
        className={styles.icon}
      />
      <Text className={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
    </div>
  );
};

export default MiniWeather;
