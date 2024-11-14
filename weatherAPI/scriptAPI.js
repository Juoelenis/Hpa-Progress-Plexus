const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

function getWeather() {
    const city = document.getElementById('city').value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherData = `
                    <h2>Weather in ${data.name}</h2>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity} %</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;
                document.getElementById('weatherInfo').innerHTML = weatherData;
            } else {
                document.getElementById('weatherInfo').innerHTML = `<p>City not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
            console.error("Error:", error);
        });
}
