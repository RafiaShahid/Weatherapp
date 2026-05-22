import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE = "http://localhost:4000";

function App() {
  const [city, setCity]       = useState("");
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  // Load search history when page opens
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error("Could not load history");
    }
  };

  const searchWeather = async () => {
    // Frontend input validation
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
    if (city.trim().length < 2) {
      setError("City name must be at least 2 characters.");
      return;
    }

    setError("");
    setWeather(null);
    setLoading(true);

    try {
      const res = await axios.get(`${API_BASE}/weather?city=${city.trim()}`);
      setWeather(res.data);
      fetchHistory(); // refresh history after new search
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchWeather();
  };

  return (
    <div className="app">
      <h1>🌤 Weather Search</h1>

      {/* Search bar */}
      <div className="search-box">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city name (e.g. London, Karachi, Tokyo)"
        />
        <button onClick={searchWeather} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Error message */}
      {error && <p className="error">{error}</p>}

      {/* Weather result */}
      {weather && (
        <div className="weather-card">
          <h2>{weather.city}, {weather.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
          />
          <p className="temp">{weather.temperature}°C</p>
          <p className="desc">{weather.description}</p>
          <div className="details">
            <span>Feels like: {weather.feels_like}°C</span>
            <span>Humidity: {weather.humidity}%</span>
            <span>Wind: {weather.wind_speed} m/s</span>
          </div>
        </div>
      )}

      {/* Search history */}
      {history.length > 0 && (
        <div className="history">
          <h3>Recent Searches</h3>
          <ul>
            {history.map((item) => (
              <li key={item.id} onClick={() => setCity(item.city)}>
                {item.city}, {item.country} — {item.temperature}°C
                <span className="time">
                  {new Date(item.createdAt).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;