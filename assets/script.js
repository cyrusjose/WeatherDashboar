$(document).ready(function() {
    var weatherKey = "a578b472b89abb8cbd34e73dc5c8b531";

    // Optional Code for temperature conversion
    var fahrenheit = true;

    $("#convertToCelsius").click(function() {
        if (fahrenheit) {
            $("#temperature").text(((($("#temperature").text() - 32) * 5) / 9));
        }
        fahrenheit = false;
    });

    $("#convertToFahrenheit").click(function() {
        if (fahrenheit == false) {
            $("#temperature").text((($("#temperature").text() * (9 / 5)) + 32));
        }
        fahrenheit = true;
    });
});