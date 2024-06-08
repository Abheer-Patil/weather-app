import { useEffect, useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { WeatherSvg } from "weather-icons-animated";
import getWeatherDetails from "./service/WeatherApi";

const getDefaultWeatherDetails = async () => {
  try {
    const res = await getWeatherDetails("Moscow");
    console.log(res);
    return res.data;
  } catch (error) {
    const res = {
      notFound: {
        message: "city not found 🥺",
      },
    };

    return res;
  }
};

const getWeatherDetailsByCityName = async (location) => {
  try {
    const res = await getWeatherDetails(location);
    return res?.data;
  } catch (error) {
    const res = {
      notFound: {
        message: "city not found !!! 🥺",
      },
    };
    return res;
  }
};

const weatherType = {
  Thunderstorm: "lightning-rainy",
  Drizzle: "rainy",
  Rain: "rainy",
  Snow: "snowy",
  Clear: "sunny",
  Mist: "cloudy",
  Smoke: "cloudy",
  Haze: "cloudy",
  Dust: "windy-variant",
  Fog: "fog",
  Sand: "windy-variant",
  Ash: "windy-variant",
  Tornado: "windy-variant",
  Squall: "windy-variant",
  Clouds: "cloudy",
};

function App() {
  useEffect(() => {
    getDefaultWeatherDetails().then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);
  const [locationData, setData] = useState({});
  const [locationName, setLocationName] = useState("");

  const handleSubmit = () => {
    console.log(locationName);
    getWeatherDetailsByCityName(locationName).then((data) => {
      console.log(data);
      setData(data);
    });

    setLocationName("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(locationName);
      getWeatherDetailsByCityName(locationName).then((data) => {
        setData(data);
      });
      setLocationName("");
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="title">
          <i class="fa-solid fa-bolt"></i>
          <p>Windy Forecast</p>
        </div>
        <div className="weatherApp">
          <div className="searchSection">
            <input
              type="text"
              placeholder="Enter location"
              onChange={(e) => {
                setLocationName(e.target.value);
              }}
              value={locationName}
              onKeyDown={handleKeyDown}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={handleSubmit}
            ></i>
          </div>

          {locationData.notFound ? (
            <div className="error-message">{locationData.notFound.message}</div>
          ) : (
            <>
              <WeatherSvg
                state={
                  locationData.weather
                    ? weatherType[locationData?.weather[0]?.main]
                    : "sunny"
                }
                width={150}
                height={150}
              />
              <div className="locationBox">
                <i className="fa-solid fa-location-crosshairs"></i>
                <p>{locationData?.name}</p>
              </div>
              <div className="tempBox">
                {`${Math.floor(locationData?.main?.temp)}`}°
              </div>
              <div className="date">
                <p>{`${new Date().toLocaleString()}`}</p>
              </div>
              <div className="infoSection">
                <div className="infoBox">
                  <i className="fa-solid fa-cloud"></i>
                  <div className="dataName">Humidity</div>
                  <div className="data">{`${locationData?.main?.humidity}`}</div>
                </div>
                <div className="infoBox">
                  <i className="fa-solid fa-wind"></i>
                  <div className="dataName">Speed</div>
                  <div className="data">{`${locationData?.wind?.speed} Km/h`}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
