// variables
const key = "8129706d5fbfcfb67a442f82bf57cab0";
const formSub = $("#search-form")

// listener for search click 
formSub.submit(function (event) {
    event.preventDefault();
    $("#today").empty();
    $("#forecast").empty();
    const cityName = $("#search-input").val().trim();
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric`;
    console.log('query: ', apiURL)

    // call to openweathermap api
    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function (result) {
        console.log(result);
        
        //* current weather
        // obtain city and date information and store into variables
        const city = result.city.name;
        const unixTime = result.list[0].dt;
        const dateToday = moment.unix(unixTime).format(" (DD/MM/YYYY)");

        //create elements to display city and date
        const todayCard = $('<div id="todayCard"></div>');
        const h2El = $("<h2></h2>");
        h2El.addClass("title");
        h2El.text(city + dateToday);
        
        // obtain icon and create imgEl to display
        const iconCode = result.list[0].weather[0].icon;
        const weatherIcon = "http://openweathermap.org/img/w/" + iconCode + ".png";
        const imgEl = $('<img id="iconIMG" src="" alt="Weather icon">');

        // append elements to display
        $("#today").append(todayCard);
        todayCard.append(h2El, imgEl);
        $('#iconIMG').attr('src', weatherIcon);

        // obtain temp info and create pEl to display
        const tempRes = result.list[0].main.temp;
        const tempText = "Temp: " + tempRes + " °C";
        
        $('<p/>',{
            text: tempText,
            class: 'temp-main'
        }).appendTo(todayCard);

        // obtain wind info and create pEl to display
        const windRes = result.list[0].wind.speed;
        const windText = "Wind: " + windRes + " KPH";
        $('<p/>',{
            text: windText,
            class: 'wind-main'
        }).appendTo(todayCard);
        
        // obtain humidity info and create pEl to display
        const humidityRes = result.list[0].main.humidity;
        const humidityText = "Humidity: " + humidityRes + "%";
        $('<p/>',{
            text: humidityText,
            class: 'humidity-main'
        }).appendTo(todayCard);

    });
});

//* 5 day Forecast

    // create a loop to cycle through the response and obtain the forecast = weather[i * 8 - 1]

    //dynamically render the information into #forecast-cards-[i]

    // append the cards to $("#forecast") section

//* Local storage

    // store city name to local storage

    //function to generate buttons from local storage 

    //append buttons to $("#history")

    //create listener for buttons - global listen with .target

 //* Style it up to make it look pretty
 
 //* Update README