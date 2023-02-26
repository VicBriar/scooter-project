const User = require('./User')
const Scooter = require('./Scooter')
const errorsObj = require('./errors')
const { needUsr, needStation } = require('./errors')

class ScooterApp {
  static stations = {
    "North": [],
    "South": [],
    "East": [],
    "West": []
  }
  static registeredUsers = {}
//methods
  static userExists(username){
    return Object.keys(ScooterApp.registeredUsers).includes(username);
  }
////registerUser
  static registerUser(username="", password="", age=0){
    if(ScooterApp.userExists(username)){
      throw new Error(errorsObj.dsntExstUsr)
    } else if(age < 18) {
      throw new Error(errorsObj.tooYoung)
    } else {
      ScooterApp.registeredUsers[username] = new User(username,password,age);
      console.log("user has been registered")
      return ScooterApp.registeredUsers[username]
    }
  }

  ////loginUser
  static loginUser(username="",password=""){
    if(!username){
      throw new Error(errorsObj.needUsr)
    //password error is handled by userobj below
    }else if(!password){
      throw new Error(errorsObj.needPswd)
    }else if(ScooterApp.userExists(username)){
      ScooterApp.registeredUsers[username].login(password);
      console.log("user has been logged in")
      return ScooterApp.registeredUsers[username];
      //if we haven't logged in, that means the user doesn't exsist.
    } else {
      throw new Error(errorsObj.dsntExstUsr)
    }

  }

  ////user password reset
  static resetPassword(username = "", password = "",newpassword="") {
    if(!username){
      throw new Error(errorsObj.needUsr)
    } else if(!password || !newpassword){
      throw new Error(errorsObj.needPswd)
    } else if (ScooterApp.userExists(username)){
      ScooterApp.registeredUsers[username].setNewPassword(password,newpassword)
    } else {
      throw new Error(errorsObj.dsntExstUsr)
    }
    }

  ////log out
  static logoutUser(username = ""){
    if(ScooterApp.userExists(username)){
      ScooterApp.registeredUsers[username].logout()
      console.log("user is logged out")
    } else {
      throw new Error(errorsObj.dsntExstUsr)
    }
  }
//helper function
  static stationExsists(station){
    return Object.keys(ScooterApp.stations).includes(station)
  }
  ////createScooter() this is called by home office, NOT users
  static createScooter(station=""){
    if(!station){
      throw new Error(errorsObj.needStation)
    } else if (ScooterApp.stationExsists(station)) {
    ScooterApp.stations[station].push(new Scooter(station))
    let scootIndex = ScooterApp.stations[station].length - 1;
    console.log("created new scooter")
    return(ScooterApp.stations[station][scootIndex])
    } else {
      throw new Error(errorsObj.dsntExstStation)
    }
  }

  //find scooter
  static findScooter(serial,station=undefined){
    if(!serial){
      throw new Error(errorsObj.needSerial)
    } else if(station && !ScooterApp.stationExsists(station)){
      throw new Error(errorsObj.dsntExstStation)
    }else if(station) {
      for(let i = 0; i < ScooterApp.stations[station].length; i++){
        if (ScooterApp.stations[station][i].serial === serial){
          return ScooterApp.stations[station][i];
        }
      }
      throw new Error(errorsObj.dsntExstScooter)
    } else if (!station) {
      let arrayOfStations = Object.keys(ScooterApp.stations);
      for(let i = 0; i < arrayOfStations.length; i++){
        for(let k = 0; k < ScooterApp.stations[arrayOfStations[i]].length; k++){
          if(ScooterApp.stations[arrayOfStations[i]][k].serial === serial){
            return ScooterApp.stations[arrayOfStations[i]][k];
          }
        }
      }
      throw new Error(errorsObj.dsntExstScooter)
    }//else if ends here
  }


   ////dock scooter
   static dockScooter(scooter,station){
    if(!ScooterApp.stationExsists(station)){
      throw new Error(errorsObj.dsntExstStation)
    } else if(ScooterApp.stations[station].inclues(scooter)){
      throw new Error(errorsObj.scooterIsDockedHere)
    } else if(!scooter || typeof scooter !== "object") {
      throw new Error(errorsObj.needScooter)
    } else {
      let index = ScooterApp.stations[scooter.station].findAtIndex(scooter)
      ScooterApp.stations[station].push(ScooterApp.stations[scooter.station].splice(index,1))
      scooter.dock(station)

    } 
   }
  ////rent scooter
  static rentScooter(scooter,user){
    //a! coming up!
  }
 
  ////print, my beloved
  static print(){
    console.log(ScooterApp,ScooterApp.stations);
  }

}



module.exports = ScooterApp
