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
  tempDisplay.innerHTML = Math.round(response.data.main.temp);

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let humiditylement = document.querySelector("#humidity");
  humiditylement.innerHTML = Math.round(response.data.main.humidity);
  let windElement = document.querySelector("#wind");
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

function convertFahrenheit(event) {
  event.preventDefault();
  temperatureConverter.innerHTML = "64";
}
let temperatureConverter = document.querySelector("#temperature-converter");

let fahrenheitClick = document.querySelector("#fahrenheit-link");
fahrenheitClick.addEventListener("click", convertFahrenheit);

function convertCelsius(event) {
  event.preventDefault();
  temperatureConverter.innerHTML = "18";
}
temperatureConverter = document.querySelector("#temperature-converter");

let celsiusClick = document.querySelector("#celsius-link");
celsiusClick.addEventListener("click", convertCelsius);
