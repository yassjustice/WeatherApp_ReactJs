import React from 'react';
import styles from './WeatherTable.module.css';

function WeatherTable({ data }) {
    if (!data) {
        return (
            <div className={styles.empty}>
                Loading weather data...
            </div>
        );
    }

    const tableData = [{
        city: data.city,
        temperature: data.temperature,
        condition: getWeatherCondition(data.weathercode)
    }];

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.header}>City</th>
                    <th className={styles.header}>Temperature</th>
                    <th className={styles.header}>Condition</th>
                </tr>
            </thead>
            <tbody>
                {tableData.map((item, index) => (
                    <tr key={index} className={styles.row}>
                        <td className={styles.cell}>{item.city}</td>
                        <td className={styles.cell}>{item.temperature}°C</td>
                        <td className={styles.cell}>{item.condition}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// Helper function to convert weather codes to conditions
function getWeatherCondition(code) {
    const conditions = {
        0: 'Clear sky',
        1: 'Partly cloudy',
        2: 'Cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Freezing fog',
        51: 'Light drizzle',
        53: 'Moderate drizzle',
        55: 'Dense drizzle',
        61: 'Light rain',
        63: 'Moderate rain',
        65: 'Heavy rain',
        71: 'Light snow',
        73: 'Moderate snow',
        75: 'Heavy snow'
    };
    return conditions[code] || 'Unknown';
}

export default WeatherTable;