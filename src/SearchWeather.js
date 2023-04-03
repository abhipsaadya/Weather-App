import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useEffect } from "react";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import WbCloudyIcon from "@mui/icons-material/WbCloudy";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import DehazeIcon from "@mui/icons-material/Dehaze";

const SearchWeather = () => {
  const [search, setSearch] = useState("London");
  const [data, setdata] = useState([]);
  const [input, setInput] = useState("");

  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=3b762076a9f5434f2286d10186cee073`
      );
      if (componentMounted) {
        setdata(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);
  let emoji = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      emoji = <WbCloudyIcon />;
    } else if (data.weather[0].main == "Thunderstrom") {
      emoji = <ThunderstormIcon />;
    } else if (data.weather[0].main == "Drizzle") {
      emoji = <ThunderstormIcon />;
    } else if (data.weather[0].main == "Snow") {
      emoji = <AcUnitIcon />;
    } else if (data.weather[0].main == "Haze") {
      emoji = <DehazeIcon />;
    } else if (data.weather[0].main == "Rain") {
      emoji = <ThunderstormIcon />;
    } else {
      emoji = <WbSunnyIcon />;
    }
  } else {
    return <div>Loading....</div>;
  }

  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  //date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString([], { month: "long" });
  let day = d.toLocaleString([], { weekday: "long" });

  //time

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };
  return (
    <div>
      <div className="container">
   
        <div className="row justify-content-center">
           <div className=" text-center mb-4 ">
            <h1 className="name">Weather App</h1>
          </div>
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                src="https://images.unsplash.com/photo-1500390365106-166bb67248d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                className="card-img"
                alt="..."
              />
              <div className="card-img-overlay">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-4 w-75 mx-auto">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                      name="search-city"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <SearchIcon />
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-3">
                  <h1 className="card-title">{data.name}</h1>
                  <p className="card-text">
                    {day},{month} {date},{year}
                    <br />
                    {time}
                  </p>
                  <hr />
                  <p className="emo"> {emoji} </p>

                  <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min} &deg;C | {temp_max} &deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
