import { getCities } from './cityService';

const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

async function findCityCoordinates(cityName) {
    if (!cityName) throw new Error('City name is required');
    
    const data = await getCities();
    
    // Search through the nested structure
    for (const region of data.regions) {
        for (const country of region.countries) {
            const city = country.cities.find(
                city => city.name.toLowerCase() === cityName.toLowerCase()
            );
            if (city) {
                return {
                    latitude: city.lat,
                    longitude: city.lng
                };
            }
        }
    }
    
    throw new Error(`City "${cityName}" not found`);
}

export async function getWeather(cityName) {
    try {
        const coords = await findCityCoordinates(cityName);
        const response = await fetch(
            `${WEATHER_API}?latitude=${coords.latitude}&longitude=${coords.longitude}&current_weather=true`
        );
        
        if (!response.ok) throw new Error('Weather fetch failed');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Weather fetch error:', error);
        throw error;
    }
}
