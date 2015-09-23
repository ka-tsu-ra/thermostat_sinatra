function Thermostat() {
  this.temp = 20;
  this.powerSave = true;
}

Thermostat.prototype.up = function() {
  if(this.powerSave) {
    if(this.temp + 1 > 25) {
      this.temp = 25;
    } else {
      this.temp ++;
    }
  } else {
    if(this.temp + 1 > 32) {
      this.temp = 32;
    } else {
      this.temp ++;
    }
  }

};

Thermostat.prototype.down = function() {
  if ((this.temp - 1) < 10) {
    this.temp = 10;
  } else {
    this.temp --;
  }
};

Thermostat.prototype.reset = function() {
  this.temp = 20;
};

Thermostat.prototype.toggle = function() {
  if (this.powerSave === true) {
    this.powerSave = false;
  }
  else if (this.powerSave === false) {
    this.powerSave = true;
    if (this.temp > 25) {
      this.temp = 25;
    }
  }
};
