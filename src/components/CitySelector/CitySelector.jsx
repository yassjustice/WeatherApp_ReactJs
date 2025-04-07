import React from 'react';
import styles from './CitySelector.module.css';

function CitySelector({ cities, selectedCity, onCityChange }) {
  return (
    <div className={styles.container}>
      <label htmlFor="city-select" className={styles.label}>
        Select a city:
      </label>
      <select
        id="city-select"
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className={styles.select}
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CitySelector;