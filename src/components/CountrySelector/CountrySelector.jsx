import React, { useState, useMemo } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import styles from './CountrySelector.module.css';

function CountrySelector({ data = { regions: [] }, onCitySelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return {
      regions: data.regions.map(region => ({
        ...region,
        countries: region.countries.map(country => ({
          ...country,
          cities: country.cities.filter(city =>
            city.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            region.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        })).filter(country => country.cities.length > 0)
      })).filter(region => region.countries.length > 0)
    };
  }, [data, searchTerm]);

  if (!data.regions.length) {
    return <div className={styles.loading}>Loading locations...</div>;
  }

  return (
    <div className={styles.container}>
      <SearchBar 
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
      />

      <div className={styles.regionsGrid}>
        {filteredData.regions.map(region => (
          <div key={region.name} className={styles.regionCard}>
            <h2 className={styles.regionTitle}>{region.name}</h2>
            <div className={styles.countriesGrid}>
              {region.countries.map(country => (
                <div key={country.name} className={styles.countrySection}>
                  <h3 className={styles.countryTitle}>{country.name}</h3>
                  <div className={styles.citiesGrid}>
                    {country.cities.map(city => city.name && (
                      <div
                        key={city.name}
                        className={`${styles.cityCard} ${city.major ? styles.majorCity : ''}`}
                        onClick={() => onCitySelect(city)}
                      >
                        <h4 className={styles.cityName}>{city.name}</h4>
                        <p className={styles.coordinates}>
                          {city.lat.toFixed(2)}°N, {city.lng.toFixed(2)}°E
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountrySelector;