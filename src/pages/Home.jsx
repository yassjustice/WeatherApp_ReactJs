import React from 'react';
import Header from '../components/Header/Header';
import WeatherDashboard from '../components/WeatherDashboard/WeatherDashboard';
import Particles from '../components/Particles/Particles';

function Home() {
  return (
    <div className="min-h-screen">
      <Particles />
      <Header />
      <WeatherDashboard />
    </div>
  );
}

export default Home;