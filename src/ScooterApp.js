const User = require('./User')
const Scooter = require('./Scooter')
const errorsObj = require('./errors')

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
    if(Object.keys(ScooterApp.registeredUsers).includes(username)){
      return true
    } else {
      return false
    }
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
    }else if(ScooterApp.userExists(username)){
      ScooterApp.registeredUsers[username].login(password);
      console.log("user has been logged in")
      return ScooterApp.registeredUsers[username];
    } else {
      throw new Error(errorsObj.dsntExstUsr)
    }

  }

  ////user password reset
  ////log out
  ////rent scooter
  ////dock scooter
  ////print, my beloved
  static print(){
    console.log(ScooterApp);
  }

}



module.exports = ScooterApp
