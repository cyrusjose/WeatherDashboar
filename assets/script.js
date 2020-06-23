$(document).ready(function () {
  $(".btn").on("click", function (event) {
    event.preventDefault();

    var cityList = [];
    init();
    
    function renderCityList() {
        // Render an new Li for each city entered even repeats.
      $(".list-group").empty();
      for (var i = 0; i < cityList.length; i++) {
        var city = cityList[i];
        var li = $("<li>");
        li.text(city);
        li.attr("class", "list-group-item");
        $(".list-group").append(li);
      }
    }

    
    function init() {
        // Get stored todos from localStorage
  // Parsing the JSON string to an object
      var storedCity = JSON.parse(localStorage.getItem("City"));

        // If cities were retrieved from localStorage, update the cities list
      if (storedCity !== null) {
        cityList = storedCity;
      }
    //   Render the list of cities to the DOM
      renderCityList();
    }

    function storeCity() {
      localStorage.setItem("City", JSON.stringify(cityList));
    }

    var cityListText = $(".cityName").val().trim();
    // Return early if empty text is in the search bar
    if (cityListText === "") {
      return;
    }
    // Add New city to list
    cityList.push(cityListText);
    
    // Store updated list in localStorage and re-render list
    renderCityList();
    storeCity();

    $(".row").removeClass("hide");
    $(".weather-info").removeClass("hide");
    var weatherKey = "a578b472b89abb8cbd34e73dc5c8b531";
    var cityName = $(".cityName").val();
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      weatherKey;
    $(".date").text(" ("+ moment().format('l') + ") ");
    $(".dateOne").text(moment().add(1, 'days').format('l'));
    $(".dateTwo").text(moment().add(2, 'days').format('l'));
    $(".dateThree").text(moment().add(3, 'days').format('l'));
    $(".dateFour").text(moment().add(4, 'days').format('l'));
    $(".dateFive").text(moment().add(5, 'days').format('l'));
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $(".cityName").val(" ");
    //   See object info
      console.log(response);
        // Put data from API in variables
      var title = response.name;
      var temp = response.main.temp * (9 / 5) - 459.67;
      var humidity = response.main.humidity;
      var wind = response.wind.speed;
      var iconNum = response.weather[0].icon;
      var iconImage = "http://openweathermap.org/img/w/" + iconNum + ".png";

      var lat = response.coord.lat;
    //   Test to make sure that latitude is grabbed
      console.log(lat);
      var lon = response.coord.lon;
    //   Test to see if longitutde is grabbed
      console.log(lon);
    //   Display Icon
      $(".todayIcon").attr("src", iconImage);
    //   Display Info on page 
      $(".cityText").text(title);
      $(".temp").text("Temperature: " + temp.toFixed(1) + "\u00B0");
      $(".humidity").text("Humidity: " + humidity + "%");
      $(".windSpeed").text("Wind Speed: " + wind + " mph");
        // URL for UV Index ajax call
      var uvURL =
        "http://api.openweathermap.org/data/2.5/uvi?appid=" +
        weatherKey +
        "&lat=" +
        lat +
        "&lon=" +
        lon;
      $.ajax({
        url: uvURL,
        method: "Get",
      }).then(function (UV) {
        // Test to see if UV index info is pulled correctly
        console.log(UV);
        // Store UV index info in variables
        var uvIndex = $(".UV-value");
        var uvIndexVal = UV.value;
        // Display UV Index on page
        uvIndex.text(uvIndexVal);
        // Set conditions for levels of UV Risk
        if (uvIndexVal > 0 && uvIndexVal < 6) {
          uvIndex.addClass("moderate");
        } else if (uvIndexVal > 5 && uvIndexVal < 8) {
          uvIndex.addClass("high");
        } else if (uvIndexVal > 7 && uvIndexVal < 11) {
          uvIndex.addClass("veryHigh");
        } else {
          uvIndex.addClass("extreme");
        }
      });

    //   URL for five day forecast call
      var fiveDayURL =
        "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        weatherKey;
    //   Ajax call for the forecast
      $.ajax({
        url: fiveDayURL,
        method: "GET",
      }).then(function (days) {
        //   Test to see if the five days are pulled correctly
        console.log(days);
        // Store the five days in variables
        var dOne = days.list[6];
        var dTwo = days.list[14];
        var dThree = days.list[22];
        var dFour = days.list[23];
        var dFive = days.list[34];
        // Convert to farenheight
        var tempOne = dOne.main.temp * (9 / 5) - 459.67;
        var tempTwo = dTwo.main.temp * (9 / 5) - 459.67;
        var tempThree = dThree.main.temp * (9 / 5) - 459.67;
        var tempFour = dFour.main.temp * (9 / 5) - 459.67;
        var tempFive = dFive.main.temp * (9 / 5) - 459.67;
        // Store humidity info in variables per day
        var humOne = dOne.main.humidity;
        var humTwo = dTwo.main.humidity;
        var humThree = dThree.main.humidity;
        var humFour = dFour.main.humidity;
        var humFive = dFive.main.humidity;
        // Store icons in variables per day
        var iconOne = dOne.weather[0].icon;
        var iconTwo = dTwo.weather[0].icon;
        var iconThree = dThree.weather[0].icon;
        var iconFour = dFour.weather[0].icon;
        var iconFive = dFive.weather[0].icon;
        // Icon information in variables
        var icImageOne = "http://openweathermap.org/img/w/" + iconOne + ".png";
        var icImageTwo = "http://openweathermap.org/img/w/" + iconTwo + ".png";
        var icImageThree =
          "http://openweathermap.org/img/w/" + iconThree + ".png";
        var icImageFour =
          "http://openweathermap.org/img/w/" + iconFour + ".png";
        var icImageFive =
          "http://openweathermap.org/img/w/" + iconFive + ".png";

        //   Display Temperature on page for the five days
        $(".tempOne").text("Temperature: " + tempOne.toFixed(1) + "\u00B0");
        $(".tempTwo").text("Temperature: " + tempTwo.toFixed(1) + "\u00B0");
        $(".tempThree").text("Temperature: " + tempThree.toFixed(1) + "\u00B0");
        $(".tempFour").text("Temperature: " + tempFour.toFixed(1) + "\u00B0");
        $(".tempFive").text("Temperature: " + tempFive.toFixed(1) + "\u00B0");

        // Dsiplay the humidity for the five days
        $(".humOne").text("Humidity: " + humOne + "%");
        $(".humTwo").text("Humidity: " + humTwo + "%");
        $(".humThree").text("Humidity: " + humThree + "%");
        $(".humFour").text("Humidity: " + humFour + "%");
        $(".humFive").text("Humidity: " + humFive + "%");

        // Display the icon for the five days.
        $(".dOneIcon").attr("src", icImageOne);
        $(".dTwoIcon").attr("src", icImageTwo);
        $(".dThreeIcon").attr("src", icImageThree);
        $(".dFourIcon").attr("src", icImageFour);
        $(".dFiveIcon").attr("src", icImageFive);
      });
    });
  });
});
