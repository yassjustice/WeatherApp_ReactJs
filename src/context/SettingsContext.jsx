import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [units, setUnits] = useState({
    temperature: 'celsius',
    wind: 'kmh'
  });

  const toggleTemperatureUnit = () => {
    setUnits(prev => ({
      ...prev,
      temperature: prev.temperature === 'celsius' ? 'fahrenheit' : 'celsius'
    }));
  };

  const toggleWindUnit = () => {
    setUnits(prev => ({
      ...prev,
      wind: prev.wind === 'kmh' ? 'mph' : 'kmh'
    }));
  };

  return (
    <SettingsContext.Provider value={{ units, toggleTemperatureUnit, toggleWindUnit }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}