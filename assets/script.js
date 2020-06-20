$(document).ready(function() {
    $('.btn').on('click', function() {


        var weatherKey = 'a578b472b89abb8cbd34e73dc5c8b531';
        var cityName = $('.cityName').val();
        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + weatherKey;

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
            var lat = response.coord.lat;
            console.log(lat);
            var lon = response.coord.lon;
            console.log(lon);
            $('.cityText').text(title);
            $('.temp').text('Temperature: ' + temp.toFixed(1) + '\u00B0');
            $('.humidity').text('Humidity: ' + humidity + '\%');
            $('.windSpeed').text('Wind Speed: ' + wind + ' mph');

            var uvURL = 'http://api.openweathermap.org/data/2.5/uvi?appid=' + weatherKey + '&lat=' + lat + '&lon=' + lon;
            $.ajax({
                url: uvURL,
                method: 'Get'
            }).then(function(UV) {
                console.log(UV);
                $('.UV').text('UV Index: ' + UV.value)
            });

            var fiveDayURL = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + weatherKey;

            $.ajax({
                url: fiveDayURL,
                method: 'GET'
            }).then(function(days) {
                console.log(days);
            });
        });
    })
});