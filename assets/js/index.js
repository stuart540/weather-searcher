var key = "8129706d5fbfcfb67a442f82bf57cab0"
var cityName = "London"
var apiURL =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric`

console.log(apiURL);

// call to open weather map api
$.ajax({
    url: apiURL,
    method: "GET"
}).then(function (result) {
    console.log(result);
    
    var city = result.city.name
    var unixTime = result.list[0].dt
    var dateToday = moment.unix(unixTime).format(" DD/MM/YYYY")
    console.log(city + dateToday);
    
    var iconCode = result.list[0].weather[0].icon
    var weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var displayIcon = $('<div id="iconContainer"><img id="iconIMG" src="" alt="Weather icon"></div>');
    $("#today").append(displayIcon)
    $('#iconIMG').attr('src', weatherIcon);

    var temp = result.list[0].main.temp;
    console.log("Temp: " + temp + " °C");

    var wind = result.list[0].wind.speed;
    console.log("Wind: " + wind + " KPH");
    
    var humidity = result.list[0].main.humidity;
    console.log("Humidity: " + humidity + "%");
});

