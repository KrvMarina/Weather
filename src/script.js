let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", formCityFunction);

let buttonCurrent = document.querySelector(".button-current");
buttonCurrent.addEventListener("click", getCurrentPosition);

//--->DATE

function formatDate(timestamp) {
  let day = document.querySelector("#day");
  let time = document.querySelector("#time");
  let date = new Date(timestamp);

  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  time.innerHTML = hours + ":" + minutes;

  let arrayDate = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  for (let i in arrayDate) {
    if (i == date.getDay()) {
      day.innerHTML = arrayDate[i];
    }
  }
}

//--->units
const celsius = document.querySelector("#celsius");
const fahrenheit = document.querySelector("#fahrenheit");
let temperature = document.querySelector("#temperature");
let temperatureValue = parseFloat(temperature.innerText);
const units = document.querySelector(".units");
let isCelsius = true;

fahrenheit.addEventListener("click", function () {
  if (isCelsius) {
    temperatureValue = temperatureValue * 1.8 + 32;
    temperature.innerHTML = Math.floor(temperatureValue);
    isCelsius = false;
  }
});

celsius.addEventListener("click", function () {
  if (!isCelsius) {
    temperatureValue = (temperatureValue - 32) * (5 / 9);
    temperature.innerHTML = Math.floor(temperatureValue);
    isCelsius = true;
  }
});

//--->API
let key = "3d9fa2779e50e6bac0fbb183f4c33866";
let cityAPI;
let cityElement = document.querySelector(".city");

function getAxios(url) {
  axios
    .get(url)
    .then(function (response) {
      showWeatherValue(response);
      showIcon(response);
      formatDate(response.data.dt * 1000);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function formCityFunction(event) {
  event.preventDefault();
  let inputCity = document.querySelector(".input-city");

  let cityAPI = inputCity.value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityAPI}&appid=${key}&units=metric`;

  getAxios(url);
}

function showWeatherValue(position) {
  cityAPI = position.data.name;
  cityElement.innerHTML = cityAPI;
  temperatureValue = Math.round(position.data.main.temp);
  temperature.innerHTML = temperatureValue;

  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let humidityAPI = position.data.main.humidity;
  let windAPI = Math.round(position.data.wind.speed);

  humidity.innerHTML = humidityAPI;
  wind.innerHTML = windAPI;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude.toFixed(1);
  let lon = position.coords.longitude.toFixed(1);

  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;

  getAxios(url);
}

function showIcon(position) {
  let mainIcon = position.data.weather[0].main;
  let icon = document.querySelector(".city-icon");

  if (mainIcon == "Atmosphere") icon.src = "images/atmosphere.svg";
  else if (mainIcon == "Clear") icon.src = "images/clear.svg";
  else if (mainIcon == "Clouds") icon.src = "images/clouds.svg";
  else if (mainIcon == "Drizzle") icon.src = "images/drizzle.svg";
  else if (mainIcon == "Rain") icon.src = "images/rain.svg";
  else if (mainIcon == "Snow") icon.src = "images/snow.svg";
  else if (mainIcon == "Thunderstorm") icon.src = "images/thunderstorm.svg";
}

function showKiev() {
  cityAPI = "Kiev";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityAPI}&appid=${key}&units=metric`;

  getAxios(url);
}

showKiev();
