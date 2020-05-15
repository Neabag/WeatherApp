import React, { useState } from 'react';
import './App.css';
const api = {
  key: "f7fd9ad508d3cc03e604f035578f6f53",
  base: "https://api.openweathermap.org/data/2.5/weather"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = event => {
    if (event.key === "Enter") {
      fetch(`${api.base}?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(weather);
          console.log(result);

        });
    }
  }
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 28) ? "App Warm" : "App Cold") : "App"}>
      <main>
        <div className="SearchBox">
          <input type="text"
            className="SearchBar"
            placeholder="Enter City Name"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          /></div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="LocationBox">
              <div className="Location">{weather.name}, {weather.sys.country}</div>
              <div className="Date">{dateBuilder(new Date())}</div>
            </div>
            <div className="WeatherBox">
              <div className="Temp">{Math.round(weather.main.temp)}°C</div>
              <div className="Weather">{weather.weather[0].main}</div>
            </div>
          </div>)
          : ('')}
      </main>

    </div>
  );
}

export default App;
