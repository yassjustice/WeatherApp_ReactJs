# 🌦️ Thunder Weather Dashboard

A modern weather dashboard built with React and Vite, featuring a dark thunder theme and real-time weather data for cities worldwide.

## 🌟 Features

- **Global Coverage**: Weather data for major cities across 6 continents
- **Dynamic Search**: Filter cities by region, country, or city name
- **Thunder Theme**: Dark mode with particle effects and lightning animations
- **Detailed Weather Info**: Temperature, wind speed, and weather conditions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 19.0.0
- **Build Tool**: Vite 6.2.0
- **Styling**: CSS Modules & Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **API**: Open Meteo Weather API
- **PWA Support**: Vite PWA Plugin

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd weather-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🗂️ Project Structure

```
weather-dashboard/
├── public/
│   └── input.json        # Cities and coordinates data
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button/
│   │   ├── CountrySelector/
│   │   ├── Particles/
│   │   ├── SearchBar/
│   │   ├── WeatherCard/
│   │   └── WeatherTable/
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   └── utils/           # Helper functions
└── vite.config.js       # Vite configuration
```

## 🎨 Theme Customization

The app uses CSS variables for theming:

```css
:root {
  --thunder-primary: #1a1a2e;
  --thunder-secondary: #16213e;
  --thunder-accent: #0f3460;
  --thunder-highlight: #533483;
  --thunder-text: #e94560;
  --thunder-light: #f5f5f5;
}
```

## 🌍 Available Regions

- Europe (UK, France, Germany, Italy, Spain)
- Africa (Morocco, Egypt, South Africa)
- Asia (Japan, China, India)
- North America (USA, Canada)
- South America (Brazil, Argentina)
- Australia

## 🚀 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 PWA Support

The application includes Progressive Web App support for:
- Offline functionality
- Install as native app
- Auto-updates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Particle effects inspired by thunder animations

