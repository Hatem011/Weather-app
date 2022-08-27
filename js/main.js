var todayWeatherDay=document.getElementById("todayWeatherDay"),
 todayWeatherDate=document.getElementById("todayWeatherDate"),
 todayWeatherCity=document.querySelector(".todayWeatherCity"),
 todayWeatherDegree=document.querySelector(".todayWeatherDegree"),
 todayWeatherIcon=document.querySelector(".todayWeatherIcon"),
 todayWeatherDescription=document.querySelector(".todayWeatherDescription"),
 nextDay=document.getElementsByClassName("nextDay"),
 nextDayImg=document.getElementsByClassName("nextDayImg"),
 maxDegree=document.getElementsByClassName("maxDegree"),
 minDegree=document.getElementsByClassName("minDegree"),
 nextDayDescription=document.getElementsByClassName("nextDayDescription"),
 searchValue=document.getElementById("searchValue"),
 currentCity="london",
 apiResponse,
 response,
 days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
 months=["Jun","Feb","Mars","April","May","June","July","Aug","Sep","Oct","Nov","Des"];


//function get Api

async function getWeatherData()
{
     response=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a3a24674c1da499888883158220906&q=${currentCity}&days=3&aqi=no&alerts=no`)
    apiResponse=await response.json();
    console.log(apiResponse);
    displayTodayWeather();
    displayNextDay();
}
getWeatherData();


// function today
function displayTodayWeather()
{
let date=new Date()
todayWeatherDay.innerHTML=days[date.getDay()]
todayWeatherDate.innerHTML=`${date.getDate()} ${months[date.getMonth()]}`
todayWeatherCity.innerHTML=apiResponse.location.name
todayWeatherDegree.innerHTML=apiResponse.current.temp_c
todayWeatherIcon.setAttribute("src",`https:${apiResponse.current.condition.icon}`)
todayWeatherDescription.innerHTML=apiResponse.current.condition.text
}

// function nextDay
function displayNextDay()
{
    for(var i=0;i<nextDay.length;i++)
    {
        nextDay[i].innerHTML=days[new Date(apiResponse.forecast.forecastday[i+1].date).getDay()]
        nextDayImg[i].setAttribute("src",`https:${apiResponse.forecast.forecastday[i+1].day.condition.icon}`)
        maxDegree[i].innerHTML=apiResponse.forecast.forecastday[i+1].day.maxtemp_c
        minDegree[i].innerHTML=apiResponse.forecast.forecastday[i+1].day.mintemp_c
        nextDayDescription[i].innerHTML=apiResponse.forecast.forecastday[i+1].day.condition.text
    }
}

// function search

searchValue.addEventListener("keyup",function()
{
    currentCity=searchValue.value;
    getWeatherData()
})