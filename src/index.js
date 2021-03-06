let searchCity = "";
let units = "metric";
let apiKey = "597c40c39084687093b091cd48b366f8";
let apiUrl;
let searchHeading = "";
let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wedneday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = ("0" + now.getMinutes()).slice(-2);
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}°C </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}°C </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "597c40c39084687093b091cd48b366f8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  console.log(response.data.main.temp);
  currentCity = response.data.name;
  let tempDisplay = document.querySelector("#temperature-converter");
  let descriptionElement = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#icon");
  let humiditylement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = response.data.main.temp;

  tempDisplay.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  humiditylement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  getForecast(response.data.coord);
}
function defaultCity(city) {
  apiKey = "597c40c39084687093b091cd48b366f8";
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  searchHeading = document.querySelector("#specific-city");
  searchHeading.innerHTML = city;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  searchCity = document.querySelector("#example-input-city");
  searchCity = searchCity.value;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}`).then(showTemperature);

  searchHeading = document.querySelector("#specific-city");
  searchHeading.innerHTML = `${searchCity}`;
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
function getLocation() {
  return navigator.geolocation.getCurrentPosition(showPosition);
}

let celsiusTemperature = null;

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureConverter.innerHTML = Math.round(fahrenheitTemperature);
}
let temperatureConverter = document.querySelector("#temperature-converter");

let fahrenheitClick = document.querySelector("#fahrenheit-link");
fahrenheitClick.addEventListener("click", convertFahrenheit);

function convertCelsius(event) {
  event.preventDefault();
  temperatureConverter.innerHTML = Math.round(celsiusTemperature);
}
let celsiusClick = document.querySelector("#celsius-link");
celsiusClick.addEventListener("click", convertCelsius);

defaultCity("Ottawa");
