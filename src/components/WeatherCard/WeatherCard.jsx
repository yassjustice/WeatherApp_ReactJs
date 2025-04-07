import React from 'react';
import styles from './WeatherCard.module.css';

function WeatherCard({ city, data, loading }) {
  if (loading) {
    return (
      <div className={styles.cardLoading}>
        <div className={styles.loadingBar}></div>
        <div className={styles.loadingBar}></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{city}</h2>
      <div className={styles.info}>
        <p>Temperature: {data.current_weather.temperature}°C</p>
        <p>Wind Speed: {data.current_weather.windspeed} km/h</p>
      </div>
    </div>
  );
}

export default WeatherCard;