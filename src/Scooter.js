const errorsObj = require("./errors");

class Scooter{
  static nextSerial = 1;
  constructor(station){
    if(!station){
      throw new Error(errorsObj.needStation)
    }
    this.station = station;
    this.user = null;
    this.serial = Scooter.nextSerial++
    this.charge = 100;
    this.isBroken = false;
  }
  //methods
  rent(user){
    if(this.isBroken){
      throw new Error(errorsObj.scooterBroken)
    } else if(this.charge <= 20) {
      throw new Error(errorsObj.scooterDying)
    }
    this.station = null;
    this.user = user;
  }

  dock(station) {
    if(!station){
      throw new Error(errorsObj.needStation)
    }
    this.station = station
    this.user = null;
  }
  //recharge()
  //requestRepair()
}




module.exports = Scooter
