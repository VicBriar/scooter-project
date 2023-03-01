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

  //I discussed this registeredScooters variable with Cory. Essentially, it gives me a way to avoid using a double-nested for-loop when testing (I did build this, it's the 'findScooter' function. But it's not efficient, so my tests use this object to acess scooters). In real-world, this would allow the user to select a scooter based on serial number quickly, regarrdless of worst case scenarios (ie last serial in a station of 5000 scooters, or something like that) 
  //in my implementation, I would change the stations object to an array full of station objects; each station object would have it's name, station address, scooter capacity, ect.. and an array containing references to each scooter it currently holds.
  static registeredScooters = {}


//~~~~~user methods!~~~~~~~

////helper function to let me make sure a user exists before I perform operations on it
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
      console.log(`user ${username} has been registered`)
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
      console.log(`user ${username} has been logged in`)
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
      console.log(`user ${username}is logged out`)
    } else {
      throw new Error(errorsObj.dsntExstUsr)
    }
  }


////~~~~~Scooter methods~~~~~~!

//helper function to make sure station exists
  static stationExsists(station){
    return Object.keys(ScooterApp.stations).includes(station)
  }
  ////createScooter() this is called by home office, NOT users
  static createScooter(station=""){
    if(!station){
      throw new Error(errorsObj.needStation)
    } else if (ScooterApp.stationExsists(station)) {
    // ScooterApp.stations[station].push(new Scooter(station))
    // let scootIndex = ScooterApp.stations[station].length - 1;
    // console.log("created new scooter")
    // return(ScooterApp.stations[station][scootIndex])
    ScooterApp.registeredScooters[Scooter.nextSerial] = new Scooter(station)
    ScooterApp.stations[station].push(ScooterApp.registeredScooters[Scooter.nextSerial-1])
    let serial = Scooter.nextSerial - 1;
    console.log(`created new scooter, #${serial}`)
    return ScooterApp.registeredScooters[serial]
    } else {
      throw new Error(errorsObj.dsntExstStation)
    }
  }

  //find scooter; this is a helper function. It is not super efficient, and I think what I did with the regsiteredscooters object is more efficient. But i have this here to prove I can create & test the app to it's specifications 
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
    } else if(ScooterApp.stations[station].includes(scooter)){
      throw new Error(errorsObj.scooterIsDockedHere)
    } else if(!scooter || typeof scooter !== "object") {
      throw new Error(errorsObj.needScooter)
    } else {
      let index = ScooterApp.stations[scooter.station].indexOf(scooter)
      //the splice returns a mini-array with one element, so the [0] returns the item, that gets pushed into the next station's array
      ScooterApp.stations[station].push(ScooterApp.stations[scooter.station].splice(index,1)[0])
      scooter.dock(station)
      console.log(`scooter #${scooter.serial} is docked`)
    } 
   }
  ////rent scooter
  static rentScooter(scooter,user){
    if(!scooter || typeof scooter !== "object"){
      throw new Error(errorsObj.needScooter)
    } else if(!user || typeof user !== "object"){
      throw new Error(errorsObj.needUsr)
    } else if (scooter.user !== null) {
      throw new Error(errorsObj.scooterIsRented)
    } else if(!user.loggedIn){
      throw new Error(errorsObj.mustLogin)
    } else {
      let index = ScooterApp.stations[scooter.station].indexOf(scooter)
      ScooterApp.stations[scooter.station].splice(index,1)[0].rent(user)
      console.log(`scooter #${scooter.serial} is rented`)
    }
    }
 
  ////print, my beloved
  ////I'm not sure what the criteria for a 'pretty' print is, because I like how this one looks. But I get the feeling it's not as neat as it could be; please let me know if I could have done it better/more efficiently 
  static print(){
    console.log(ScooterApp,ScooterApp.stations);
  }

}



module.exports = ScooterApp
