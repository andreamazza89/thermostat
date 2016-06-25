'use strict';


function Thermostat() {

  const LOW_ENERGY_THRESHOLD = 18;
  const MID_ENERGY_THRESHOLD = 25;
  const START_TEMPERATURE = 20;
  const MIN_TEMPERATURE = 10;
  const POWER_SAVING_MODE_ON_MAX_TEMPERATURE = 25;
  const POWER_SAVING_MODE_OFF_MAX_TEMPERATURE = 32;

  var isMaximumTemperature = function(powerSaving, temperature) {
    if(powerSaving){
      return temperature >= POWER_SAVING_MODE_ON_MAX_TEMPERATURE
    } else {
      return temperature >= POWER_SAVING_MODE_OFF_MAX_TEMPERATURE
    }
  };

  this.powerSaving = true;
  this.temperature;


  this.decreaseTemperature= function() {
    if(this.temperature > MIN_TEMPERATURE) {
      this.temperature--;
    }
  };


  this.getCurrentTemperature= function(callback) {

      $.ajax({
        url: 'http://localhost:9292/temperature',
        success: function(temperature) {
          callback(temperature.temperature);
        }
      });

  }

  this.increaseTemperature= function() {
    if(!isMaximumTemperature(this.powerSaving, this.temperature)) {
      this.temperature++;
    }
  };

  this.enablePowerSavingMode=function() {
    if (this.temperature > POWER_SAVING_MODE_ON_MAX_TEMPERATURE) {
      this.temperature = POWER_SAVING_MODE_ON_MAX_TEMPERATURE;
    }
    this.powerSaving = true;
  };

  this.disablePowerSavingMode=function() {
    this.powerSaving = false;
  };

  this.toggleEco=function() {
    this.powerSaving = !this.powerSaving
    if ((this.powerSaving)&&(this.temperature > POWER_SAVING_MODE_ON_MAX_TEMPERATURE)) {
      this.temperature = POWER_SAVING_MODE_ON_MAX_TEMPERATURE;
    }
  };

  this.resetTemperature=function() {
    this.temperature = START_TEMPERATURE;
  };

  this.energyUsage= function() {
    if(this.temperature < LOW_ENERGY_THRESHOLD) {
      return 'low_usage';
    } else if (this.temperature < MID_ENERGY_THRESHOLD) {
      return 'mid_usage';
    } else {
      return 'high_usage';
    }
  };
}
