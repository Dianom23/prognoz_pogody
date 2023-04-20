let key = 'ab81a111ce358c191ec78636f9b8450d'
let city = 'Ставрополь'
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=ru`
console.log(url)
// api.openweathermap.org/data/2.5/weather?q=Ставрополь&appid=ab81a111ce358c191ec78636f9b8450d&units=metric

let temp, feelsLike, desc, wind, icon

let l_temp = document.querySelector('#l_temp')
let l_feelsLike = document.querySelector('#l_feelsLike')
let l_wind = document.querySelector('#l_wind')
let l_desc = document.querySelector('#l_desc')
let l_icon = document.querySelector('#icon')

let inputCity = document.querySelector('#inputCity')
inputCity.addEventListener('change', GetData)

async function GetData(){
    SetUrl()
    let data = await fetch(url)
    if(!data.ok){
        console.log("Ошибка")
        return
    }

    let json = await data.json()
    temp = json.main.temp
    feelsLike = json.main.feels_like
    desc = json.weather[0].description
    wind = json.wind.speed
    icon = json.weather[0].icon
    GetDataWeather(temp, feelsLike, desc, wind, icon)
}
function GetDataWeather(_temp, _feelsLike, _desc, _wind, _icon){
    console.log(_temp,_feelsLike,_desc,_wind,_icon)
    l_temp.innerHTML = 'Температура: ' + _temp + '&deg;'
    l_feelsLike.innerHTML = 'Ощущается как: ' + _feelsLike + '&deg;'
    l_desc.textContent = _desc
    l_wind.textContent = 'Скорость ветра: ' + _wind + ' м/c'
    l_icon.src = `http://openweathermap.org/img/wn/${_icon}@4x.png`
}
function SetUrl(){
    city = inputCity.value
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=ru`
}
