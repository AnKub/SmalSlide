import React, { useEffect } from 'react';
import { useWeather } from '../../Hooks/useWeather';
import { Image, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons-react';
import styles from './MiniWeather.module.scss';

const MiniWeather: React.FC = () => {
  const { weather, fetchWeather, setError, error, loadFromCache } = useWeather();

  useEffect(() => {
    loadFromCache();
    fetchWeather();
  }, []);

  useEffect(() => {
    if (error) {
      showNotification({
        title: 'Weather Error',
        message: error,
        color: 'red',
        icon: <IconAlertCircle size="1rem" />,
      });

      const timeout = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error, setError]);

  return (
    <div className={styles.miniWeather}>
      {weather ? (
        <>
          <Image
            src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="weather icon"
            className={styles.icon}
          />
          <Text className={styles.temp}>{Math.round(weather.main.temp)}°C</Text>
        </>
      ) : (
        <>
          <div className={styles.iconPlaceholder} />
          <Text className={styles.tempPlaceholder}>--°C</Text>
        </>
      )}
    </div>
  );
};

export default MiniWeather;