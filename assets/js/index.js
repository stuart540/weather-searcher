var key = "8129706d5fbfcfb67a442f82bf57cab0"
var cityName = "London"
var apiURL =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric`

console.log(apiURL);
 
// call to open weather map
$.ajax({
    url: apiURL,
    method: "GET"
}).then(function (result) {
    console.log(result);
    var temp = result.list[0].main.temp;
    console.log("Temp: " + temp + " °C");
    var wind = result.list[0].wind.speed;
    console.log("Wind: " + wind + " KPH");
    var humidity = result.list[0].main.humidity;
    console.log("Humidity: " + humidity + "%");
});

