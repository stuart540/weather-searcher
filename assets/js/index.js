// variables
const key = "8129706d5fbfcfb67a442f82bf57cab0";
const formSub = $("#search-form")

// Arrays to hold the forecast values
const forecastIconArr =[]
const forecastTempArr = []
const forecastWindArr = []
const forecastHumidityArr = []
const forecastDateArr = []

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
        const todayCard = $('<div id="today-card"></div>');
        const h2El = $("<h2></h2>");
        h2El.addClass("title");
        h2El.text(city + dateToday);
        
        // obtain icon and create imgEl to display
        const weatherIcon = `https://openweathermap.org/img/w/${result.list[0].weather[0].icon}.png`;
        const imgEl = $(`<img id="iconIMG" src="" alt="Weather icon">`);

        // append elements to display
        $("#today").append(todayCard);
        todayCard.append(h2El, imgEl);
        $('#iconIMG').attr('src', weatherIcon);

        // obtain temp info and create pEl to display
        const tempText = `Temp: ${result.list[0].main.temp} °C`;
        
        $('<p/>',{
            text: tempText,
            class: 'temp-main'
        }).appendTo(todayCard);

        // obtain wind info and create pEl to display
        const windText = `Wind: ${result.list[0].wind.speed} KPH`;
        $('<p/>',{
            text: windText,
            class: 'wind-main'
        }).appendTo(todayCard);
        
        // obtain humidity info and create pEl to display
        const humidityText = `Humidity: ${result.list[0].main.humidity}%`;
        $('<p/>',{
            text: humidityText,
            class: 'humidity-main'
        }).appendTo(todayCard);


        //* 5 day Forecast
        
        // loop through response at every 8th value (24 hours), then push values to arrays

        for (let i = 7; i < result.list.length; i = i+=8) {
            const forecastIcon = `https://openweathermap.org/img/w/${result.list[i].weather[0].icon}.png`;
            forecastIconArr.push(forecastIcon)
            const forecastTemp = `Temp: ${result.list[i].main.temp} °C`;
            forecastTempArr.push(forecastTemp)
            const forecastWind = `Wind: ${result.list[i].wind.speed} KPH`;
            forecastWindArr.push(forecastWind)
            const forecastHumidity = `Humidity: ${result.list[i].main.humidity}%`;
            forecastHumidityArr.push(forecastHumidity)
            
        }
        
        console.log(forecastIconArr);
        console.log(forecastTempArr);
        console.log(forecastWindArr);
        console.log(forecastHumidityArr);


        //dynamically render the information into #forecast-cards-[i]

        

        //push 5 day forecast dates from moment into forecastDateArr

        for (let j = 0; j < 5; j++) {
          const date = moment.unix(unixTime + 86400 * [j+1]).format(" DD/MM/YYYY");
          forecastDateArr.push(date)

            //create elements to display date 
          const forecastCard = $('<div id="forecast-card"></div>');
          const h3El = $("<h3></h3>");
          const forecastImgEl = $(`<img id="iconIMG" src="${forecastIconArr[j]}" alt="Weather icon">`);
          h3El.addClass("title");
          h3El.text(date);

            // append elements to display
          $("#forecast").append(forecastCard);
          forecastCard.append(h3El, forecastImgEl);
          // $('#iconIMG').attr('src', forecastIconArr[j]);

          $('<p/>',{
            text: forecastTempArr[j],
            class: 'forecast-temp'
        }).appendTo(forecastCard);

        $('<p/>',{
          text: forecastWindArr[j],
          class: 'forecast-wind'
      }).appendTo(forecastCard);

      $('<p/>',{
        text: forecastHumidityArr[j],
        class: 'forecast-humidity'
    }).appendTo(forecastCard);
          
        }
          
        console.log(forecastDateArr);
        
        // append the cards to $("#forecast") section


    });
});


//* Local storage

    // store city name to local storage

    //function to generate buttons from local storage 

    //append buttons to $("#history")

    //create listener for buttons - global listen with .target

 //* Style it up to make it look pretty
 
 //* Update README