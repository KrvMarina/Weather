let formCity = document.querySelector("#form-city");
formCity.addEventListener("submit", formCityFunction);

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
      formatDate(response.data.dt * 1000);
      getForecast(response.data.coord);
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

  let icon = document.querySelector(".city-icon");
  icon.src = showIcon(position.data.weather[0].icon);
}

function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();

  let arrayDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return arrayDay[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let weatherDays = document.querySelector("#weather-days");
  let weatherDaysHTML = "";

  forecast.forEach(function (day, index) {
    if (index < 6) {
      weatherDaysHTML += `<div class="weather-forecast">
              <h4 class="weather-forecast-date">${formatDay(day.dt)}</h4>
              <img class="weather-forecast-icon" src="${showIcon(
                response.data.daily[index].weather[0].icon
              )}" />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max"> ${Math.round(
                  day.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min"> ${Math.round(
                  day.temp.min
                )}°</span>
              </div>
            </div>`;
    }
  });

  weatherDays.innerHTML = weatherDaysHTML;
}

function getForecast(coordinates) {
  let apiKey = "cabdbda40038ba7d1165b953b1c7bd6c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showIcon(mainIcon) {
  if (mainIcon.startsWith("01")) return "images/01.svg";
  else if (mainIcon.startsWith("02")) return "images/02.svg";
  else if (mainIcon.startsWith("03") || mainIcon.startsWith("04"))
    return "images/03.svg";
  else if (mainIcon.startsWith("09")) return "images/09.svg";
  else if (mainIcon.startsWith("10")) return "images/10.svg";
  else if (mainIcon.startsWith("11")) return "images/11.svg";
  else if (mainIcon.startsWith("13")) return "images/13.svg";
  else if (mainIcon.startsWith("50")) return "images/50.svg";
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

function showKiev() {
  cityAPI = "Kiev";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityAPI}&appid=${key}&units=metric`;

  getAxios(url);
}

showKiev();
