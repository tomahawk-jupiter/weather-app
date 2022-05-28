const options = { mode: "cors" };
const apiKey = null;

// ASYNC & AWAIT
async function getWeather(cityName) {
  if (apiKey) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
    const response = await fetch(url, options);
    const data = await response.json();
    const weather = data.weather[0].main;
    const city = data.name;
    const country = data.sys.country;
    const temp = data.main.temp;
    const description = data.weather[0].description;
    return { weather, city, country, temp, description };
  } else {
    alert("API key removed from project for security.");
  }
}

const input = document.querySelector(".input");
const searchBtn = document.querySelector(".search-btn");
const mainWeather = document.querySelector(".main-weather");
const cityCountry = document.querySelector(".location");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const unitsBtn = document.querySelector(".unit");

const displayData = async (dataObj) => {
  const d = await dataObj;
  mainWeather.innerText = d.weather;
  cityCountry.innerText = `${d.city}, ${d.country}`;
  temperature.innerText = `${Math.round(d.temp)}°C`;
  description.innerText = d.description;
};

const handleSearch = () => {
  const dataObj = getWeather(input.value);
  displayData(dataObj);
};

const handleUnits = () => {
  const temp = temperature.innerText;
  const oldValue = temp.slice(0, -2);
  const unit = temp.slice(-2);
  let newUnit;
  let prevUnit;
  let newValue;
  if (unit === "°C") {
    newUnit = "°F";
    prevUnit = "°C";
    newValue = oldValue * 1.8 + 32;
  } else if (unit === "°F") {
    newUnit = "°C";
    prevUnit = "°F";
    newValue = (oldValue - 32) * (5 / 9);
  }
  temperature.innerText = Math.round(newValue) + newUnit;
  unitsBtn.innerText = prevUnit;
};

searchBtn.addEventListener("click", handleSearch);
unitsBtn.addEventListener("click", handleUnits);
