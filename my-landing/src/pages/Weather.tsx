import React, { useState, useEffect } from "react";
import { useWeather } from "../Hooks/useWeather";
import { Container, TextInput, Button, Card, Text, Image } from "@mantine/core";
import { useDebounce } from 'use-debounce';
import styles from "./WeatherApp.module.scss";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState("");
  const { weather, error, fetchWeather } = useWeather();
  const [debouncedCity] = useDebounce(city, 1000); 

  // debounce
  useEffect(() => {
    if (debouncedCity) {
      fetchWeather(debouncedCity);
    }
  }, [debouncedCity, fetchWeather]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && city.trim()) {
      fetchWeather(city); 
    }
  };

  return (
    <Container className={styles.container}>
      <div className={styles.inputContainer}>
        <TextInput
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className={styles.input}
          onKeyDown={handleKeyDown} 
        />
        <Button onClick={() => fetchWeather(city)} className={styles.button}>
          Get Weather
        </Button>
      </div>

      {error && <Text className={styles.error}>{error}</Text>}

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
              <Text className={styles.weatherDescription}>{weather.weather[0].description}</Text>
            </div>
            <div className={styles.rightSide}>
              <Text className={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default WeatherApp;
