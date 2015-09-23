var thermostat = new Thermostat();
$( document ).ready(function() {

  colour = function(){
    if(thermostat.temp < 18) {
      $("#temp").css("color", "green");
    } else if((thermostat.temp >= 18) && (thermostat.temp < 25)) {
      $("#temp").css("color", "orange");
    } else if(thermostat.temp >= 25) {
      $("#temp").css("color", "red");
    }
  };

  function firstTemp() {
    $.get('/temp', function (data) {
        thermostat.temp = parseInt(data);
        refreshTemp();
        // PUT THE REFRESHTEMP CALL INSIDE THE GET FUNCTION SO THAT IT WONT EXECUTE UNTIL THE GET IS FINISHED.
      });
  }

  function refreshTemp() {
    colour();
    $("#temp").html(thermostat.temp);
  }

  var city = "London";

  var cityWeather =  function() {

    $.getJSON('http://api.openweathermap.org/data/2.5/find?q=' + city + '&units=metric',
      function (data) {
        $('#currentCity').html("Current temperature in " + city);
        $('#cityWeather').html(data.list[0].main.temp + " C");
    });

    // the function(data) {} part is the 'callback' - the function that runs when ajax call is finished. Part of the JavaScript asynchronous thing.
  };

  var loadForecast = function() {
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&units=metric,us&mode=json',
      function (data) {
        $('#forecastCity').html("Today\'s forecast for " + city)
        $('#forecast').html((parseInt(data.list[0].temp.day) - 273.15).toFixed(2) + " C");
    });
  };

  $('#cityId').submit(function(e) {
    e.preventDefault();
    city = $('#cityName').val();
    cityWeather();
    loadForecast();
  });

  firstTemp();
  cityWeather();
  loadForecast();

  $("#up").click(function() {
    thermostat.up();
    refreshTemp();
    $.post( "/start", {temp: thermostat.temp}, function () {
    } );
  });

  $("#down").click(function() {
    thermostat.down();
    refreshTemp();
    $.post( "/start", {temp: thermostat.temp}, function () {
    } );
  });

  $("#toggle").change(function() {
    thermostat.toggle();
    refreshTemp();
  });
});
