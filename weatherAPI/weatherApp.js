import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const apiKey = 'YOUR_API_KEY';

    const getWeather = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    setWeatherData(data);
                } else {
                    setWeatherData(null);
                    alert("City not found. Please try again.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error fetching weather data.");
            });
    };

    return (
        <div className="weather-app">
            <h1>Weather App</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="input-field"
                />
                <button onClick={getWeather} className="weather-button">Get Weather</button>
            </div>
            {weatherData && (
                <div className="weather-info">
                    <h2>Weather in {weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
