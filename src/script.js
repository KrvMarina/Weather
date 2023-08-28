let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", formCityFunction);

let buttonCurrent = document.querySelector(".button-current");
buttonCurrent.addEventListener("click", getCurrentPosition);

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
  let mainIcon = position.data.weather[0].icon;
  let icon = document.querySelector(".city-icon");

  console.log(mainIcon);

  if (mainIcon.startsWith("01")) icon.src = "images/01.svg";
  else if (mainIcon.startsWith("02")) icon.src = "images/02.svg";
  else if (mainIcon.startsWith("03") || mainIcon.startsWith("04"))
    icon.src = "images/03.svg";
  else if (mainIcon.startsWith("09")) icon.src = "images/09.svg";
  else if (mainIcon.startsWith("10")) icon.src = "images/10.svg";
  else if (mainIcon.startsWith("11")) icon.src = "images/11.svg";
  else if (mainIcon.startsWith("13")) icon.src = "images/13.svg";
  else if (mainIcon.startsWith("50")) icon.src = "images/50.svg";
}

function showKiev() {
  cityAPI = "Kiev";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityAPI}&appid=${key}&units=metric`;

  getAxios(url);
}

showKiev();

function displayWeatherDays() {
  let weatherDays = document.querySelector("#weather-days");

  let weatherDaysHTML = "";
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  days.forEach(function (day) {
    weatherDaysHTML += `<div class="weather-forecast">
              <h4 class="weather-forecast-date">${day}</h4>
              <img class="weather-forecast-icon" src="images/01.svg" />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> 18° </span>
                <span class="weather-forecast-temperature-min"> 12° </span>
              </div>
            </div>`;
  });

  weatherDays.innerHTML = weatherDaysHTML;
}

displayWeatherDays();
