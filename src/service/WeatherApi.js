import axios from "axios";
import process from "process";

const API_KEY = process.env.API_KEY || `d9ed3c837002d06c8ee93bda05cd70ef`;

export default async function getWeatherDetailsByCityName(location) {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
  );
  return res;
}
