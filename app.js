const apiKey = '877671c29e3d2017a45916f7ac5d4763'; // Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherCard = document.getElementById('current-weather');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const weatherIcon = document.getElementById('weather-icon');

searchBtn.addEventListener('click', fetchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

async function fetchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const { name, main, weather } = data;
    const { temp } = main;
    const { description: weatherDescription, icon } = weather[0];

    // Update the weather card with fetched data
    cityName.textContent = name;
    temperature.textContent = `Temperature: ${temp}°C`;
    description.textContent = `Description: ${weatherDescription}`;

    // Set weather icon
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
    weatherIcon.alt = weatherDescription;

    // Show the weather card
    weatherCard.style.display = 'block';
}
