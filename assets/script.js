$(document).ready(function() {
    var weatherKey = 'a578b472b89abb8cbd34e73dc5c8b531';
    var cityName = $('.cityName').val();
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + 'colton' + '&appid=a578b472b89abb8cbd34e73dc5c8b531';

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response) {
        console.log(response);
        // $('.weather-info').text(JSON.stringify(response));
        var title = response.name;
        var temp = (response.main.temp * (9 / 5)) - 459.67;
        var humidity = response.main.humidity;
        var wind = response.wind.speed;
        var lat = '';
        var long = '';
        $('.cityText').text(title);
        $('.temp').text('Temperature: ' + temp.toFixed(2) + '\u00B0');
        $('.humidity').text('Humidity: ' + humidity + '\%');
        $('.windSpeed').text('Wind Speed: ' + wind + ' mph');
    });


});