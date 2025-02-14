document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "04eb47586e4e656fcaabeaf9f937bbe4";

  //the main click part
  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim()
    if(!city) return;

    //might throw an error
    //server/databse may be far

    try{
      const weatherData = await fetchWeatherData(city)
      displayWeatherData(weatherData);
    } catch(e){
      showError()
    }
  })

  async function fetchWeatherData(city){
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url)

    if(!response.ok){
      throw new Error("City not Found")
    }

    //converts to json so that its a proper object and we can extract data
    const data = await response.json()
    return data;
  }

  function displayWeatherData(data){
    //display
    console.log(data);

    const {name, main, weather} = data;
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temparature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    //unlock the display
    weatherInfo.classList.remove('hidden')
    errorMessage.classList.add('hidden')
  }

  function showError(){
    weatherInfo.classList.add('hidden')
    errorMessage.classList.remove('hidden')
  }
})