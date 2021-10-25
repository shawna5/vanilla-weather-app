let searchCity = "";
let units = "metric";
let apiKey = "597c40c39084687093b091cd48b366f8";
let apiUrl;
let currentCity = "";

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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function search(event) {
  event.preventDefault();
  searchCity = document.querySelector("#example-input-city");
  searchCity = searchCity.value;
  console.log(searchCity);
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(showTemperture);

  let searchHeading = document.querySelector("#specific-city");
  searchHeading.innerHTML = `${searchCity}`;
}
function showTemperture(response) {
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
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
//navigator.geolocation.getCurrentPosition(showPosition);
function getLocation() {
  return navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(position) {
  //let lat = position.coords.latitude;
  //let lon = position.coords.longitude;
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  document.querySelector("#specific-city").innerHTML = currentCity;
  axios.get(`${geoApiUrl}`).then(showTemperture);
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

displayForecast();
