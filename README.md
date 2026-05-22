Weather App

A full-stack weather search application built with React, Node.js, Express, TypeORM, and PostgreSQL. 
it fetch live Data OpenWeatherMap API and saves every search to a database.

 Features
- Search weather by city name
- Displays temperature, humidity, wind speed, and weather icon
- Saves search history to PostgreSQL
- Handles API errors, timeouts, and bad user input

setup Instructions:
1. Clone the repo
git this repo https://github.com/RafiaShahid/Weatherapp
cd weather-app

2. Backend setup
cd backend
npm install
cp .env.example .env

Edit .env and fill in your values:
- WEATHER_API_KEY = your OpenWeatherMap key
//before that create a database called "weatherapp"
- DB_PASS = your PostgreSQL password

npm run dev

 3. Frontend setup (open new terminal)
cd frontend
npm install
npm start
Important: If you run into an issue where the terminal says 'Port 3000 is already in use,' you will be prompted to confirm. Simply confirm, and the app will automatically start on port 3001. After that, you can access the frontend by visiting localhost:3001 in your browser to test everything.

5. Open the app
Visit http://localhost:3001

API Endpoints
- GET /weather?city=London — fetch weather for a city
- GET /history — fetch last 10 searches
- GET / — health check
