import React, { useEffect } from "react";
import { useWeather } from "../Hooks/useWeather";
import { Container, Button, Card, Text, Image, Loader } from "@mantine/core";
import styles from "../styles/Weather.module.scss";

const Weather: React.FC = () => {
  const { weather, error, loading, fetchWeather, loadFromCache } = useWeather();

  useEffect(() => {
    loadFromCache(); 
  }, []);

  return (
    <Container className={styles.container}>
      <div className={styles.inputWrapper}>
        <input
            type="text"
            className={styles.input}
            placeholder="Enter city"
        />
        <Button onClick={fetchWeather} className={styles.button}>
          Refresh Weather
        </Button>

        <Text
          className={`${styles.error} ${error ? styles.visible : ""}`}
        >
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
