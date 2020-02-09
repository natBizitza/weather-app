import React, { useState } from "react";
import "./App.css";

const api = {
  key: "***",
  endpoint: "api.openweathermap.org"
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<any>({});

  const search = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      fetch(
        `${api.endpoint}weather?q=${query}&units=metric&APPID=${api.key}`
      ).then(res => res.json()).then(result=> {
        setWeather(result);
        setQuery('');
        console.log(result);

      })
    }
  };

  const dateBuilder = (d: Date) => {
    const months: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    const days: string[] = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className={(typeof weather.main !== undefined) ? ((weather.main?.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={event => setQuery(event.target.value)} value={query}
          onKeyPress={() => search}
           />
        </div>
        {(typeof weather.main != "undefined") ? (
          <>
   <div className="location-box">
   <div className="location">{weather.name}, {weather.sys.country}</div>
   <div className="date">{dateBuilder(new Date())}°C</div>
 </div>
 <div className="weather-box">
        <div className="temp">{Math.round(weather.main.temp)}</div>
   <div className="weather">{weather.weather[0].main}</div>
 </div>
 </>) : ('') 
      }
     
      </main>
    </div>
  );
};

export default App;
