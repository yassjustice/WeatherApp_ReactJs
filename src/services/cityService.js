import { DEFAULT_CITIES_URL } from "../config";

export async function getCities() {
  try {
    const response = await fetch(DEFAULT_CITIES_URL);
    if (!response.ok) throw new Error("Failed to load cities");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return { regions: [] };
  }
}

export function findCityByName(data, cityName) {
  for (const region of data.regions) {
    for (const country of region.countries) {
      const city = country.cities.find(
        c => c.name.toLowerCase() === cityName.toLowerCase()
      );
      if (city) return city;
    }
  }
  return null;
}
