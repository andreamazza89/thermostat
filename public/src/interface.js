'use strict';

$(document).ready(function(){

  thermostat = new Thermostat();
  var thermostat;
  apiCall();
  updateTemperature();
  //refactor below please
  thermostat.powerSaving ? $('#eco').attr('class', 'eco_on') : $('#eco').attr('class', 'eco_off');

    function writeTemperature(temperature) {
      $('#temperature').text(temperature)
    }

  function updateTemperature() {

    thermostat.getCurrentTemperature(writeTemperature);
   // $('#temperature').attr('class',thermostat.energyUsage());
    //$('.dial').val(thermostat.getCurrentTemperature()).trigger('change')
  }

  $('.dial').knob({
    'min': 10,
    'max': 32,
    'readOnly': true,
    'angleArc': 270,
    'angleOffset': -135,
  });

  $('#increase').on('click', function(){

    thermostat.getCurrentTemperature(postTemperature);

    function postTemperature(t) {

      $.ajax({
        type: 'POST',
        url: 'http://localhost:9292/temperature/' + (t + 1),
        success: updateTemperature()
      });
    }
    
  })

  $('#decrease').on('click', function(){
    thermostat.decreaseTemperature();
    updateTemperature();
  })

  $('#reset').on('click', function(){
    thermostat.resetTemperature();
    updateTemperature();
  })

  $('#eco').on('click', function(){
    toggleEcoButton();
  })

  function apiCall()  {
    var stateCity;
    var city;
    stateCity = $('#city_list').val();
    city = $("option[value='" + stateCity + "']").text();
    $('#city').text(city);


    $.ajax({
      url : "http://api.wunderground.com/api/47d299c55b24b723/geolookup/conditions/q/" + stateCity + ".json",
      dataType : "jsonp",
      success : function(parsed_json) {
        var location = parsed_json['location']['city'];
        var temp_c = parsed_json['current_observation']['temp_c'];
        $('#city_temp').text(temp_c);
      }
    });
  }

 $('#city_list').change(function(){
   apiCall();
 });

  function toggleEcoButton() {
    thermostat.toggleEco();
    //refactor below please
    thermostat.powerSaving ? $('#eco').attr('class', 'eco_on') : $('#eco').attr('class', 'eco_off');
    updateTemperature();
  }

});
