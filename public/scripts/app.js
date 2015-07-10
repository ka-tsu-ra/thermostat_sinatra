var thermostat = new Thermostat();
$( document ).ready(function() {

  colour = function(){
    if(thermostat.temp < 18) {
      $("#temp").css("color", "green");
    } else if((thermostat.temp >= 18) && (thermostat.temp < 25)) {
      $("#temp").css("color", "orange");
    } else if(thermostat.temp >= 25) {
      $("#temp").css("color", "red");
    };
  };

  function firstTemp() {
    $.get('http://localhost:9292/temp', function (data) {
        thermostat.temp = parseInt(data);
        refreshTemp();
        // PUT THE REFRESHTEMP CALL INSIDE THE GET FUNCTION SO THAT IT WONT EXECUTE UNTIL THE GET IS FINISHED.
      });
  };

  function refreshTemp() {
    colour();
    $("#temp").html(thermostat.temp);
  };

  var city = "London";

  var cityWeather =  function() {

    $.getJSON('http://api.openweathermap.org/data/2.5/find?q=' + city + '&units=metric',
      function (data) {
        $('#currentCity').html(city + " current temp");
        $('#cityWeather').html(data.list[0].main.temp);
    });

    // the function(data) {} part is the 'callback' - the function that runs when ajax call is finished. Part of the JavaScript asynchronous thing.
  };

  $('#cityId').submit(function(e) {
    e.preventDefault();
    city = $('#cityName').val();
    cityWeather();
  });

  firstTemp();
  cityWeather();

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
