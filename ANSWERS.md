QUESTION NO 1
How to run: Give the exact command(s) or steps to run your project on a fresh machine. If anything needs installing, list it.
You need following installed on you machine
1) Node.js 18+
2) PostgreSQL running locally with a database named `weather_app`
3) OpenWeatherMap free API key

Steps to run :
1. Clone the repository: git clone  https://github.com/RafiaShahid/Weatherapp
2. cd weather-app/backend
3. npm install
4. Create backend/.env from backend/.env.example and fill in your values
5. Run backend: npm run dev (runs on port 3000)
6. Open a new terminal: cd weather-app/frontend 
7. npm install
8. npm start
9. Open http://localhost:3001



QUESTION NO 2
Stack choice: Why did you pick this stack/language/framework for this task? What would have been a worse choice and why?

I chose Node.js with Express for the backend, PostgreSQL for the database, and a simple frontend using HTML/CSS/JavaScript because I have recently worked with this stack in other projects and I am already comfortable with it. Since I was familiar with the development workflow, package management, routing, and database setup, I was able to focus more on building the required functionality and handling edge cases instead of spending time learning a completely new technology.
A worse choice for this task would have been using a more complex stack that I had little experience with, because it would increase development time and make debugging harder. For example, using a heavy framework or unfamiliar language for a relatively small public API project could add unnecessary complexity without improving the final result.

QUESTION NO 3
One real edge case: Describe one specific edge case your code handles correctly. Point to the file and line number. Explain what would happen without that handling.
 

File: backend/src/index.js, line where axios is called.

The `timeout: 5000` option on the axios request handles the case where 
OpenWeatherMap is slow to respond. Without this, the request would hang 
indefinitely, leaving the user staring at a loading spinner with no feedback. 

With the timeout, if the API takes longer than 5 seconds, axios throws an 
error with code ECONNABORTED, which is caught in the catch block and returned 
to the user as a clear "Weather service is taking too long" message.

QUESTION NO 4

AI usage: List every place you used AI (which tool, what you asked, what it gave you). For at least one of these, describe something you changed about the AI output and why.

AI Usage

I used a cloud AI tool to help me build the frontend because I am newer to React, while I have prior experience with Node.js. I asked the AI to generate the entire structure of my React frontend. Specifically, it provided me with the App.js and App.css files. I also asked for guidance on how to set the backend API URL in the frontend. The AI gave me a default URL pointing to port 4000, but since my backend was actually running on port 3000, I adjusted the code manually to point to port 3000.After receiving the AI output, I reviewed and customized it—ensuring that I fixed the port configuration—so it matched my backend. Without that adjustment, the frontend would have tried calling a wrong port, resulting in failed API requests.


Honest gap:  What's one thing in your submission that isn't good enough, and what would you do to fix it with another day?



One thing in my submission that isn’t good enough is that the frontend UI is still quite basic. While the app works, the user experience isn’t as polished as I would like. If I had another day, I would spend more time refining the layout, adding responsive design, and improving accessibility
