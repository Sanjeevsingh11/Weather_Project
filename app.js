// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

const weatherApi = {
  key: "bab281d79e5f1e9755a68d754cc313e7",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather",
};

const searchInputBox = document.getElementById("input-box");

// Event Listener Function on keypress
searchInputBox.addEventListener("keypress", (event) => {
  if (event.keyCode == 13) {
    getWeatherReport(searchInputBox.value);
    document.querySelector(".weather-body").style.display = "block";
  }
});

// Get Weather Report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then((weather) => {
      return weather.json();
    })
    .then(showWeatherReport)
    .catch((error) => {
      console.log(error);
      if (error) {
        let div = document.getElementById("xyz");

        div.innerHTML = ``;
      }
      alert(city + " not found!!");
      window.location.href = "./index.html";
    });
}

// Show Weather Report
function showWeatherReport(weather) {
  let city = document.getElementById("city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temperature = document.getElementById("temp");
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById("min-max");
  minMaxTemp.innerHTML = `${Math.floor(
    weather.main.temp_min
  )}&deg;C (min)&nbsp;&nbsp;/ &nbsp;${Math.ceil(
    weather.main.temp_max
  )}&deg;C (max) `;

  let weatherType = document.getElementById("weather");
  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById("date");
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);

  let map = document.getElementById("map");
  map.innerHTML = "";

  let iframe = document.createElement("iframe");
  iframe.src = `https://maps.google.com/maps?q=${searchInputBox.value}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  iframe.style.height = "200px";
  iframe.style.width = "200px";
  map.append(iframe);

  console.log(weatherType.textContent, "-----");
  if (weatherType.textContent == "Clear") {
    document.body.style.backgroundImage = "url('images/clearsky.gif')";

    document.querySelector("audio").src = "/music/sunny-day.mp3";
    document.querySelector("audio").play();
  } else if (weatherType.textContent == "Clouds") {
    document.body.style.backgroundImage = "url('images/cloud.gif')";
    document.querySelector("audio").src = "/music/cloud.mp3";
    document.querySelector("audio").play();
  } else if (weatherType.textContent == "Haze") {
    document.body.style.backgroundImage = "url('images/haze.gif')";
    document.querySelector("audio").src = "/music/MIST.mp3";
    document.querySelector("audio").play();
  } else if (weatherType.textContent == "Rain") {
    document.body.style.backgroundImage = "url('images/rainy.gif')";
    document.querySelector("audio").src = "/music/raining.mp3";
    document.querySelector("audio").play();
  } else if (weatherType.textContent == "Snow") {
    document.body.style.backgroundImage = "url('images/snowfall.gif')";
    document.querySelector("audio").src = "/music/snowfall.mp3";
    document.querySelector("audio").play();
  } else if (weatherType.textContent == "Thunderstorm") {
    document.body.style.backgroundImage = "url('images/thunder1.gif')";
    document.querySelector("audio").src = "/music/Thunder.mp3";
    document.querySelector("audio").play();
  } else if (weatherType.textContent == "Mist") {
    document.body.style.backgroundImage = "url('images/giphy.gif')";
    document.querySelector("audio").src = "/music/MIST.mp3";
    document.querySelector("audio").play();
  }
}

// Date manage
function dateManage(dateArg) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} (${day}), ${year}`;
}
