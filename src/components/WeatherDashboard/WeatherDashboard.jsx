import React, { useEffect, useState } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import WeatherStats from "../WeatherStats/WeatherStats";
import ForecastTabs from "../ForecastTabs/ForecastTabs";
import CountrySelector from "../CountrySelector/CountrySelector";
import Loader from "../Loader/Loader";
import { getCities } from "../../services/cityService";
import { getWeather } from "../../services/weatherService";
import { SettingsProvider } from "../../context/SettingsContext";
import styles from './WeatherDashboard.module.css';

function WeatherDashboard() {
  const [citiesData, setCitiesData] = useState({ regions: [] });
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCities();
        setCitiesData(data);
      } catch (err) {
        setError('Failed to load cities');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchCityWeather = async (city) => {
    setLoading(true);
    try {
      const data = await getWeather(city.name);
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !citiesData.regions.length) return <Loader />;

  return (
    <SettingsProvider>
      <div className={styles.container}>
        {!selectedCity ? (
          <CountrySelector 
            data={citiesData}
            onCitySelect={(city) => {
              setSelectedCity(city);
              fetchCityWeather(city);
            }}
          />
        ) : (
          <div className={styles.weatherView}>
            <button 
              className={styles.backButton}
              onClick={() => setSelectedCity(null)}
            >
              ← Back to Cities
            </button>
            
            <WeatherCard
              city={selectedCity.name}
              data={weatherData}
            />
            
            {weatherData && (
              <>
                <WeatherStats data={weatherData} />
                <ForecastTabs data={weatherData} />
              </>
            )}
          </div>
        )}
        
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </SettingsProvider>
  );
}

export default WeatherDashboard;