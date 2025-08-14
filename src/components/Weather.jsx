import { useState } from "react";
import axios from "axios";

function Weather() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState("");
    const [temp, setTemp] = useState("");
    const [desc, setDesc] = useState("");

    const API_KEY = "af8aae5e1bf4e29348345e7afa805bbb";

    function handleCity(event) {
        const value = event.target.value;
        setCity(value);

        // Clear weather data if input is empty
        if (value.trim() === "") {
            setWeather("");
            setTemp("");
            setDesc("");
        }
    }

    function getWeather() {
        if (!city) {
            alert("Please enter a city name");
            return;
        }

        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => {
                setWeather(response.data.weather[0].main);
                setTemp(response.data.main.temp);
                setDesc(response.data.weather[0].description);
            })
            .catch(() => {
                alert("Could not fetch weather data. Please check the city name.");
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-emerald-500 p-4">
            <div className="bg-blue-700 bg-opacity-20 backdrop-blur-md rounded-xl p-6 text-center w-full max-w-md shadow-lg text-black">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4"> Weather Report</h1>
                <p className="mb-4 text-sm sm:text-base">
                    Your city's weather, accurate and always updated
                </p>

                
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                    <input
                        value={city}
                        onChange={handleCity}
                        type="text"
                        placeholder="Enter Your City Name"
                        className="flex-1 p-2 rounded text-black focus:outline-none text-sm sm:text-base"
                    />
                    <button
                        onClick={getWeather}
                        className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded text-sm sm:text-base"
                    >
                        Get Report
                    </button>
                </div>

                {weather && (
                    <div className="mt-4 space-y-2 text-sm sm:text-lg">
                        <p><strong>Weather:</strong> {weather}</p>
                        <p><strong>Temperature:</strong> {temp}°C</p>
                        <p><strong>Description:</strong> {desc}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;