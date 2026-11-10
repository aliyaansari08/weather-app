const api_key = "cb4c76ceaee255f15113555a50de5fd8";


const temp = document.getElementById("temp");
const input = document.getElementById("city-input");
const datecity = document.getElementById("date-city");
const condition = document.getElementById("condition");
const highlow = document.getElementById("high-low");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherimg = document.getElementById("weather-img");




function getImage(type) {
    if (type ==="Clear") return "Sunny.jpeg";
    if (type === "Clouds") return"partly cloudy.jpeg";
    if (type === "Rain" || type ==="Drizzle") return "rainy.jpeg";
    if (type === "Thunderstrom") return"thunderstrom.jpeg";
    return"sunny.jpeg";
}

async function getWeather (city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    temp.textContent = Math.round(data.main.temp)+"°C";

    const day = new Date().toLocaleDateString("en-us",{weekday:"long"}).toUpperCase();
    datecity.textContent = day+" . "+data.name.toUpperCase()+" . "+data.sys.country;
    condition.textContent = data.weather[0].main;
    highlow.textContent = "H:" +Math.round(data.main.temp_max)+ "L:" +Math.round(data.main.temp_min)+ "°";
    humidity.textContent = data.main.humidity + "%";
    wind.textContent = Math.round(data.wind.speed*3.6)+"km/h";
    weatherimg.src = getImage(data.weather[0].main);

}


input.addEventListener("keydown", function (e){
 if (e.key === "Enter"){
    const city = input.value.trim();
    getWeather(city);
 }
});


