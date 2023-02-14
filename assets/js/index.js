var key = "8129706d5fbfcfb67a442f82bf57cab0";
var cityName = "London";
var apiURL =`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric`;

// call to open weather map api
$.ajax({
    url: apiURL,
    method: "GET"
}).then(function (result) {
    console.log(result);
    
    var city = result.city.name;
    var unixTime = result.list[0].dt;
    var dateToday = moment.unix(unixTime).format(" (DD/MM/YYYY)");
    var todayCard = $('<div id="todayCard"></div>');
    var cityTitle = $("<h2></h2>");
    cityTitle.addClass("title");
    cityTitle.text(city + dateToday);
    
    var iconCode = result.list[0].weather[0].icon;
    var weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
    var displayIcon = $('<img id="iconIMG" src="" alt="Weather icon">');
    $("#today").append(todayCard);
    todayCard.append(cityTitle, displayIcon);
    $('#iconIMG').attr('src', weatherIcon);

    var tempRes = result.list[0].main.temp;
    var tempText = "Temp: " + tempRes + " °C";
    // var tempEL = $("<p></p>")
    $('<p/>',{
        text: tempText,
        class: 'temp-main'
    }).appendTo('#todayCard');

    var windRes = result.list[0].wind.speed;
    var windText = "Wind: " + windRes + " KPH";
    $('<p/>',{
        text: windText,
        class: 'wind-main'
    }).appendTo('#todayCard');
    
    var humidityRes = result.list[0].main.humidity;
    var humidityText = "Humidity: " + humidityRes + "%";
    $('<p/>',{
        text: humidityText,
        class: 'humidity-main'
    }).appendTo('#todayCard');

    // todayCard.append(temp, wind, humidity);

});

