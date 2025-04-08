import React, { useState } from 'react';
import { 
  WiDaySunny, 
  WiNightClear, 
  WiRain, 
  WiSnow, 
  WiCloudy,
  WiDayCloudyHigh,
  WiThunderstorm,
  WiFog
} from 'react-icons/wi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './ForecastTabs.module.css';

// Weather code mapping helper
function getWeatherIcon(code) {
  // WMO Weather interpretation codes (WW)
  // https://open-meteo.com/en/docs
  switch (true) {
    case code === 0: // Clear sky
      return <WiDaySunny />;
    case code >= 1 && code <= 3: // Partly cloudy
      return <WiDayCloudyHigh />;
    case code >= 45 && code <= 48: // Foggy
      return <WiFog />;
    case code >= 51 && code <= 67: // Rain
      return <WiRain />;
    case code >= 71 && code <= 77: // Snow
      return <WiSnow />;
    case code >= 80 && code <= 82: // Rain showers
      return <WiRain />;
    case code >= 95 && code <= 99: // Thunderstorm
      return <WiThunderstorm />;
    default:
      return <WiCloudy />;
  }
}

function ForecastTabs({ data }) {
  const [activeTab, setActiveTab] = useState('hourly');

  // Add data validation
  if (!data || !data.hourly || !data.daily) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading forecast data...</div>
      </div>
    );
  }

  // Safely process hourly data
  const hourlyData = data.hourly?.time?.map((time, index) => ({
    time: new Date(time).toLocaleTimeString([], { hour: '2-digit' }),
    temp: data.hourly.temperature_2m?.[index],
    precipitation: data.hourly.precipitation_probability?.[index],
    weathercode: data.hourly.weathercode?.[index]
  }))?.slice(0, 24) || [];

  // Safely process daily data
  const dailyData = data.daily?.time?.map((date, index) => ({
    date: new Date(date).toLocaleDateString([], { weekday: 'short' }),
    max: data.daily.temperature_2m_max?.[index],
    min: data.daily.temperature_2m_min?.[index],
    precipitation: data.daily.precipitation_sum?.[index],
    weathercode: data.daily.weathercode?.[index]
  })) || [];

  // Add empty state handling
  if (!hourlyData.length && !dailyData.length) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>No forecast data available</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'hourly' ? styles.active : ''}`}
          onClick={() => setActiveTab('hourly')}
        >
          Hourly
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'daily' ? styles.active : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          7-Day
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'hourly' ? (
          <div className={styles.hourlyForecast}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload?.length) {
                    const data = payload[0].payload;
                    return (
                      <div className={styles.tooltip}>
                        <p>{data.time}</p>
                        <p>{data.temp}°C</p>
                        <div className={styles.tooltipIcon}>
                          {getWeatherIcon(data.weathercode)}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }} />
                <Line type="monotone" dataKey="temp" stroke="#e94560" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className={styles.dailyForecast}>
            {dailyData.map((day, index) => (
              <div key={index} className={styles.dayCard}>
                <h3>{day.date}</h3>
                <div className={styles.tempRange}>
                  <span>{day.max}°</span>
                  <span>{day.min}°</span>
                </div>
                <div className={styles.icon}>
                  {getWeatherIcon(day.weathercode)}
                </div>
                <span>{day.precipitation}mm</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForecastTabs;