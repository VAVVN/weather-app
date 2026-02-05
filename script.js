//Write the functions that hit the API. You’re going to want functions that can take a location and return the weather data for that location. For now, just console.log() the information.
async function getWeatherData(location) {
    const apiKey = 'dc8ec0d2acb3438a927133625260502';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const weather = processWeatherData(data);
        updateWeatherUI(weather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const location = document.getElementById('location-input').value;
    getWeatherData(location);
});

//Write the functions that process the JSON data you’re getting from the API and return an object with only the data you require for your app.
function processWeatherData(data) {
    return {
        location: data.location.name,
        temperature: data.current.temp_c,
        condition: data.current.condition.text
    };
}

//Write the functions that update the DOM with the weather data.
function updateWeatherUI(weather) {
    const weatherInfoDiv = document.getElementById('weather-info');
    weatherInfoDiv.innerHTML = `
        <h2>Weather in ${weather.location}</h2>
        <p>Temperature: ${weather.temperature}°C</p>
        <p>Condition: ${weather.condition}</p>
    `;
}