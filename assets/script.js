$(document).ready(function () {
 
    

    $(".btn").on("click", function (event) {
    
    event.preventDefault();
    
    var cityList = [];
    init();
    function renderCityList(){
        $('.list-group').empty();
        for(var i = 0; i < cityList.length; i++){
            var city = cityList[i];
            var li = $('<li>');
            li.text(city);
            li.attr('class','list-group-item');
            $('.list-group').append(li);
        }
    }

    function init(){
        var storedCity = JSON.parse(localStorage.getItem('City'));

        if (storedCity !== null){
            cityList = storedCity;
        }
        renderCityList();
    }

    function storeCity(){
        localStorage.setItem('City', JSON.stringify(cityList));
    }
    
    var cityListText = $('.cityName').val().trim();

    if(cityListText === ""){
        return;
    }
    
    cityList.push(cityListText);
    $('.cityName').empty();

    renderCityList();
    storeCity();

    $(".row").removeClass("hide");
    $(".weather-info").removeClass("hide");
    var weatherKey = "a578b472b89abb8cbd34e73dc5c8b531";
    var cityName = $(".cityName").val();
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      weatherKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      
      var title = response.name;
      var temp = response.main.temp * (9 / 5) - 459.67;
      var humidity = response.main.humidity;
      var wind = response.wind.speed;
      var iconNum = response.weather[0].icon;
      var iconImage = "http://openweathermap.org/img/w/" + iconNum + ".png";
      
      var lat = response.coord.lat;
      console.log(lat);
      var lon = response.coord.lon;
      console.log(lon);
      $(".cityText").text(title);
      $(".todayIcon").attr("src", iconImage);
      $(".temp").text("Temperature: " + temp.toFixed(1) + "\u00B0");
      $(".humidity").text("Humidity: " + humidity + "%");
      $(".windSpeed").text("Wind Speed: " + wind + " mph");

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
        console.log(UV);
        var uvIndex = $('.UV-value');
        var uvIndexVal = UV.value;
        uvIndex.text(uvIndexVal);

        if (uvIndexVal > 0 && uvIndexVal < 6){
            uvIndex.addClass('moderate');
        } else if (uvIndexVal > 5 && uvIndexVal < 8) {
            uvIndex.addClass('high');
        } else if (uvIndexVal > 7 && uvIndexVal < 11) {
            uvIndex.addClass('veryHigh');
        } else {
            uvIndex.addClass('extreme');
        }
      });

      var fiveDayURL =
        "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        weatherKey;

      $.ajax({
        url: fiveDayURL,
        method: "GET",
      }).then(function (days) {
        console.log(days);
        var dOne = days.list[6];
        var dTwo = days.list[14];
        var dThree = days.list[22];
        var dFour = days.list[23];
        var dFive = days.list[34];

        var tempOne = dOne.main.temp * (9 / 5) - 459.67;
        var tempTwo = dTwo.main.temp * (9 / 5) - 459.67;
        var tempThree = dThree.main.temp * (9 / 5) - 459.67;
        var tempFour = dFour.main.temp * (9 / 5) - 459.67;
        var tempFive = dFive.main.temp * (9 / 5) - 459.67;

        var humOne = dOne.main.humidity;
        var humTwo = dTwo.main.humidity;
        var humThree = dThree.main.humidity;
        var humFour = dFour.main.humidity;
        var humFive = dFive.main.humidity;

        var iconOne = dOne.weather[0].icon;
        var iconTwo = dTwo.weather[0].icon;
        var iconThree = dThree.weather[0].icon;
        var iconFour = dFour.weather[0].icon;
        var iconFive = dFive.weather[0].icon;

        var icImageOne = "http://openweathermap.org/img/w/" + iconOne + ".png";
        var icImageTwo = "http://openweathermap.org/img/w/" + iconTwo + ".png";
        var icImageThree =
          "http://openweathermap.org/img/w/" + iconThree + ".png";
        var icImageFour =
          "http://openweathermap.org/img/w/" + iconFour + ".png";
        var icImageFive =
          "http://openweathermap.org/img/w/" + iconFive + ".png";

        $(".tempOne").text("Temperature: " + tempOne.toFixed(1) + "\u00B0");
        $(".tempTwo").text("Temperature: " + tempTwo.toFixed(1) + "\u00B0");
        $(".tempThree").text("Temperature: " + tempThree.toFixed(1) + "\u00B0");
        $(".tempFour").text("Temperature: " + tempFour.toFixed(1) + "\u00B0");
        $(".tempFive").text("Temperature: " + tempFive.toFixed(1) + "\u00B0");

        $(".humOne").text("Humidity: " + humOne + "%");
        $(".humTwo").text("Humidity: " + humTwo + "%");
        $(".humThree").text("Humidity: " + humThree + "%");
        $(".humFour").text("Humidity: " + humFour + "%");
        $(".humFive").text("Humidity: " + humFive + "%");

        $(".dOneIcon").attr("src", icImageOne);
        $(".dTwoIcon").attr("src", icImageTwo);
        $(".dThreeIcon").attr("src", icImageThree);
        $(".dFourIcon").attr("src", icImageFour);
        $(".dFiveIcon").attr("src", icImageFive);
      });
    });
  });
});
