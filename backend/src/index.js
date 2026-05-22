require("reflect-metadata");
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const AppDataSource = require("./data-source");
const Search = require("./entity/Search");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize database then start server
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully");

    // ─── ROUTE 1: GET /weather ─
    // Takes a city name from query string: /weather?city=London
    app.get("/weather", async (req, res) => {
      const city = req.query.city?.trim();

      // Edge case 1: bad or missing input
      if (!city || city.length < 2) {
        return res.status(400).json({
          error: "Please enter a valid city name (at least 2 characters).",
        });
      }

      // Edge case 2: input contains numbers only
      if (/^\d+$/.test(city)) {
        return res.status(400).json({
          error: "City name cannot be only numbers.",
        });
      }

      try {
        // Call OpenWeatherMap API
        // Edge case 3: slow API — timeout after 5 seconds
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              q: city,
              appid: process.env.WEATHER_API_KEY,
              units: "metric",
            },
            timeout: 5000,
          }
        );

        const data = response.data;

        // Save search to database
        const searchRepo = AppDataSource.getRepository(Search);
        await searchRepo.save({
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          description: data.weather[0].description,
        });

        // Return weather data to frontend
        res.json({
          city: data.name,
          country: data.sys.country,
          temperature: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          wind_speed: data.wind.speed,
          icon: data.weather[0].icon,
        });

      } catch (err) {
        // Edge case 4: API timed out
        if (err.code === "ECONNABORTED") {
          return res.status(504).json({
            error: "Weather service is taking too long. Please try again.",
          });
        }

        // Edge case 5: city not found
        if (err.response?.status === 404) {
          return res.status(404).json({
            error: `City "${city}" was not found. Check the spelling and try again.`,
          });
        }

        // Edge case 6: invalid API key
        if (err.response?.status === 401) {
          return res.status(401).json({
            error: "Invalid API key. Check your .env file.",
          });
        }

        // Generic fallback error
        console.error(err.message);
        return res.status(500).json({
          error: "Something went wrong. Please try again later.",
        });
      }
    });

    // ─── ROUTE 2: GET /history ───────────────────────────────────────────
    // Returns the last 10 searches from the database
    app.get("/history", async (req, res) => {
      try {
        const searchRepo = AppDataSource.getRepository(Search);
        const history = await searchRepo.find({
          order: { createdAt: "DESC" },
          take: 10,
        });
        res.json(history);
      } catch (err) {
        res.status(500).json({ error: "Could not fetch history." });
      }
    });

    // ─── ROUTE 3: Health check ───────────────────────────────────────────
    app.get("/", (req, res) => {
      res.json({ message: "Weather API is running." });
    });

    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });