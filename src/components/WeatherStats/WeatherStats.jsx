import React from 'react';
import { WiHumidity, WiStrongWind, WiThermometer, WiDaySunny, WiRaindrops } from 'react-icons/wi';
import styles from './WeatherStats.module.css';

function WeatherStats({ data }) {
  // Data validation
  if (!data || !data.current_weather || !data.hourly) {
    return (
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          Loading weather stats...
        </div>
      </div>
    );
  }

  const currentHourIndex = new Date().getHours();
  const current = data.current_weather;
  
  const stats = [
    {
      icon: <WiThermometer className={styles.icon} />,
      label: 'Feels Like',
      value: `${current.temperature}°C`
    },
    {
      icon: <WiHumidity className={styles.icon} />,
      label: 'Humidity',
      value: `${data.hourly.relativehumidity_2m?.[currentHourIndex] || 0}%`
    },
    {
      icon: <WiStrongWind className={styles.icon} />,
      label: 'Wind',
      value: `${current.windspeed} km/h`
    },
    {
      icon: <WiDaySunny className={styles.icon} />,
      label: 'UV Index',
      value: data.hourly.uv_index?.[currentHourIndex] || 'N/A'
    },
    {
      icon: <WiRaindrops className={styles.icon} />,
      label: 'Precipitation',
      value: `${data.hourly.precipitation_probability?.[currentHourIndex] || 0}%`
    }
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, index) => (
        <div key={index} className={styles.statCard}>
          {stat.icon}
          <h3>{stat.label}</h3>
          <p>{stat.value}</p>
        </div>
      ))}
    </div>
  );
}

export default WeatherStats;