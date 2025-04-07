// random city picker
const cities = [
    'New York',
    'London',
    'Paris',
    'Berlin',
    'Tokyo'
];

export function getRandomCity() {
    const randomIndex = Math.floor(Math.random() * cities.length);
    return cities[randomIndex];
}
