import React, { useEffect } from "react";
import { useWeather } from "../Hooks/useWeather";
import { Image, Text } from "@mantine/core";
import styles from "./MiniWeather.module.scss";

const MiniWeather: React.FC = () => {
  const { weather, fetchWeather } = useWeather();

  useEffect(() => {
    const saved = localStorage.getItem("weather");
    const lastFetch = localStorage.getItem("lastFetch");

    if (!saved || !lastFetch || Date.now() - Number(lastFetch) > 30 * 60 * 1000) {
      fetchWeather("Magdeburg");
    }
  }, [fetchWeather]);

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
