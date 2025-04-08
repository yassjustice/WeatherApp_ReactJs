import React from 'react';
import { WiHumidity, WiStrongWind, WiThermometer, WiDaySunny, WiRaindrops } from 'react-icons/wi';
import styles from './WeatherStats.module.css';

function WeatherStats({ data }) {
  const current = data.current_weather;
  const currentHourIndex = new Date().getHours();
  
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statCard}>
        <WiThermometer className={styles.icon} />
        <h3>Feels Like</h3>
        <p>{current.temperature}°C</p>
      </div>
      
      <div className={styles.statCard}>
        <WiHumidity className={styles.icon} />
        <h3>Humidity</h3>
        <p>{data.hourly.relativehumidity_2m[currentHourIndex]}%</p>
      </div>
      
      <div className={styles.statCard}>
        <WiStrongWind className={styles.icon} />
        <h3>Wind</h3>
        <p>{current.windspeed} km/h</p>
        <p>{getWindDirection(current.winddirection)}</p>
      </div>
      
      <div className={styles.statCard}>
        <WiDaySunny className={styles.icon} />
        <h3>UV Index</h3>
        <p>{data.hourly.uv_index[currentHourIndex]}</p>
      </div>
      
      <div className={styles.statCard}>
        <WiRaindrops className={styles.icon} />
        <h3>Precipitation</h3>
        <p>{data.hourly.precipitation_probability[currentHourIndex]}%</p>
      </div>
    </div>
  );
}

function getWindDirection(degrees) {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export default WeatherStats;