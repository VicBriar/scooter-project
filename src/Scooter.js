class Scooter{
  static nextSerial = 1;
  constructor(station){
    if(!station){
      throw new Error("Station name required")
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
      throw new Error("scooter is broken and cannot be checked out, please try again in 5 seconds :)")
    } else if(this.charge <= 20) {
      throw new Error("scooter needs to charge first. Please try again later")
    }
    this.station = null;
    this.user = user;
  }

  dock(station) {
    this.station = station
    this.user = null;
  }
  //recharge()
  //requestRepair()
}




module.exports = Scooter
