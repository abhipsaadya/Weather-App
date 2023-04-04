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
  
   let img = null;
  if (typeof data.main != "undefined") {
    if (data.weather[0].main == "Clouds") {
      img =
        "https://images.unsplash.com/photo-1513069020900-a162c4db0762?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGNsb3VkcyUyMHNreXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60";
    } else if (data.weather[0].main === "Thunderstrom") {
      img =
        "https://images.unsplash.com/photo-1429552077091-836152271555?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bGlnaHRpbmclMjBzdG9ybXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60";
    } else if (data.weather[0].main === "Drizzle") {
      img =
        "https://images.unsplash.com/photo-1630574232726-fc3ea90637b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZHJpenpsaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
    } else if (data.weather[0].main === "Snow") {
      img =
        "https://images.unsplash.com/photo-1431036101494-66a36de47def?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8c25vd2ZhbGx8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60";
    } else if (data.weather[0].main === "Haze") {
      img =
        "https://images.unsplash.com/photo-1613908614131-77aed27b030b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhhemV8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60";
    } else if (data.weather[0].main === "Rain") {
      img =
        "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbiUyMHNreXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60";
    } else if (data.weather[0].main === "Smoke") {
      img =
        "https://images.unsplash.com/photo-1639540052028-114587ade923?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHNtb2tlJTIwd2VhdGhlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60";
    } else {
      img =
        "https://images.unsplash.com/photo-1678338712030-6b529c30bd41?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDg4fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
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
              {<img src={img} className="card-img" alt="..." />}
  
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
