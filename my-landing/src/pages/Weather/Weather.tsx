// Weather.tsx
import React, { useEffect, useState, useCallback } from "react";
import { useWeather } from "../../Hooks/useWeather";
import { Container, Button, Card, Text, Image, Loader } from "@mantine/core";
import styles from "./Weather.module.scss";

const Weather: React.FC = () => {
  const { weather, error, loading, fetchWeather, loadFromCache } = useWeather();
  const [city, setCity] = useState("");
  const [debouncedCity, setDebouncedCity] = useState("");

  // Debounce input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedCity(city);
    }, 1000); // 1 секунда затримки
    return () => clearTimeout(handler);
  }, [city]);

 
  useEffect(() => {
    loadFromCache();
  }, []);

  const handleFetch = useCallback(() => {
    if (debouncedCity.trim()) {
      fetchWeather(debouncedCity.trim());
    }
  }, [debouncedCity, fetchWeather]);

  return (
    <Container className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter city (English preferred)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button onClick={handleFetch} className={styles.button} disabled={!debouncedCity}>
          Refresh Weather
        </Button>

        <Text className={`${styles.error} ${error ? styles.visible : ""}`}>
          {error || ""}
        </Text>

        {loading && <Loader color="blue" className={styles.loader} />}
      </div>

      {weather && (
        <Card className={styles.card}>
          <Text className={styles.cityName}>{weather.name}</Text>

          <div className={styles.weatherDetails}>
            <div className={styles.leftSide}>
              <Image
                src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="weather icon"
                className={styles.weatherIcon}
              />
              <Text className={styles.weatherDescription}>
                {weather.weather[0].description}
              </Text>
            </div>
            <div className={styles.rightSide}>
              <Text className={styles.temperature}>
                {Math.round(weather.main.temp)}°C
              </Text>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default Weather;
