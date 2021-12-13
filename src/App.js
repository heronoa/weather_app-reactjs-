import React, { useState } from 'react';
/* API Key and Url */
const api = {
  key: "5464b2df467576a3f4839ab27d5a3a45",
  base: "https://api.openweathermap.org/data/2.5/"
}


// MAIN COMPONENTS
function App() {
  // STATES
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');


  // FUNCTIONS
  // ASYNC FUNCTIONS CONSUMING OPENWEATHERMAP
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}
      &units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
          });
    }
  }

  // BUILD THE DATE THAT WILL BE DISPLAYED IN THE SCREEN
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", 
    "April", "May", "June", "July", "August", 
    "September", "October", "November", "December"];

    let days = ["Sunday", "Monday", "Tuesday", 
    "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  // COMPONENT RETURN
  return (
    <div className={
      (typeof weather.main != "undefined") 
    ? ((weather.main.temp > 16) 
    ? 'app warm' 
    : 'app') 
    : 'app'}>
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
          
        </div>
        {/* CONDITIONAL RETURN */}
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="weather-box-sup">
                {/* TEMPERATURE */}
                <div className="temp">
                {Math.round(weather.main.temp)}°C
                </div>
              </div>
              <div className="weather-box-bot">
                {/* WEATHER */}
                <div className="weather">
                <img 
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].main} /> 
                {weather.weather[0].main}
                </div>
                {/* WIND */}
                <div className="wind">
                      <div className="windArea">
                        <div className="windDirection" style={{transform:`rotate(${weather.wind.deg -90}deg)`}}></div>
                      </div>
                      <div className="windTitle">Wind</div>
                      <div className="windSpeed">{weather.wind.speed}<span>km/h</span></div>
              </div>        
              </div>
            </div>
          </div>
        ) : ("")}
      </main>  
    </div>
  );
}

export default App;
