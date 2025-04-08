import React, { useState } from 'react';
import { WiDaySunny, WiNightClear, WiRain } from 'react-icons/wi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './ForecastTabs.module.css';

function ForecastTabs({ data }) {
  const [activeTab, setActiveTab] = useState('hourly');
  
  const hourlyData = data.hourly.time.map((time, index) => ({
    time: new Date(time).toLocaleTimeString([], { hour: '2-digit' }),
    temp: data.hourly.temperature_2m[index],
    precipitation: data.hourly.precipitation_probability[index]
  })).slice(0, 24);

  const dailyData = data.daily.time.map((date, index) => ({
    date: new Date(date).toLocaleDateString([], { weekday: 'short' }),
    max: data.daily.temperature_2m_max[index],
    min: data.daily.temperature_2m_min[index],
    precipitation: data.daily.precipitation_sum[index]
  }));

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
                <Tooltip />
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
                <WiRain className={styles.icon} />
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